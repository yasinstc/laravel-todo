var Todo = {
    todoListItem: $(".todo-list"),
    todoListInput: $(".todo-list-input"),
    todoNotFound: $("#todo-not-found"),
    init: function () {
        this.getAll();
        this.events();
    },

    events: function () {
        $(document).on(
            "click",
            ".todo-list-add-btn",
            this.click_addBtn.bind(this)
        );

        $(document).on(
            "change",
            ".todo-list input[type=checkbox]",
            this.change_Checkbox.bind(this)
        );

        $(document).on(
            "click",
            ".todo-list .remove",
            this.click_Remove.bind(this)
        );
    },

    getAll: function () {
        var $this = this;
        $this.todoListItem.html("Loading...");

        $.get(base_url + "todo/all").done(function (res) {
            $this.todoListItem.empty();

            if (res.length == 0) {
                $this.todoNotFound.show();
                $this.todoListItem.hide();
            } else {
                $this.todoNotFound.hide();
                $this.todoListItem.show();
                res.forEach(function (obj) {
                    var li_class = "";
                    var checked = "";
                    var completed_date = "";

                    if (obj.status == "completed") {
                        li_class = "completed";
                        checked = "checked";
                        completed_date = `(${obj.completed_date})`;
                    }
                    $this.todoListItem.append(`<li class="${li_class}">
    <div class='form-check'>
        <label class='form-check-label'>
            <input class='checkbox' type='checkbox' value="${obj.id}" ${checked} /> 
            <span>${obj.name}</span>
            <small class="ml-2">${completed_date}</small>
            <i class='input-helper'></i>
        </label>
    </div>
    <i class='remove mdi mdi-close-circle-outline' data-id="${obj.id}"></i>
    </li>`);
                });
            }
        });
    },

    click_addBtn: function (e) {
        e.preventDefault();
        var $this = this;
        var elem = $(e.target).closest("button");
        var item = $this.todoListInput.val();

        elem.attr("disabled", true);

        $.post(base_url + "todo/store", {
            item: item,
        })
            .done(function (res) {
                elem.attr("disabled", false);

                if (res.success) {
                    $this.todoListInput.val("");
                    $this.getAll();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        html: res.data.msg,
                    });
                }
            })
            .fail(function () {
                elem.attr("disabled", false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Try again."
                });
            });
    },

    change_Checkbox: function (e) {
        e.preventDefault();
        var $this = this;
        var elem = $(e.target).closest("input[type=checkbox]");
        var id = elem.val();

        $.post(base_url + "todo/change-status/" + id).done(function (res) {
            if (res.success) {
                $this.getAll();
            }
        });
    },

    click_Remove: function (e) {
        var $this = this;
        var elem = $(e.target).closest("i");
        var id = elem.data("id");

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.post(base_url + "todo/delete/" + id).done(function (res) {
                    if (res.success) {
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                        );
                        $this.getAll();
                    }
                });
            }
        });
    },
};

Todo.init();
