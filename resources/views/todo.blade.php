@extends('app')

@section('content')
<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
                <div class="card px-3">
                    <div class="card-body">
                        <h4 class="card-title"> Awesome Todo List </h4>
                        <div class="add-items d-flex">
                            <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?">
                            <button class="add btn btn-primary font-weight-bold todo-list-add-btn"> Add </button>
                        </div>
                        <div class="list-wrapper">
                            <div class="alert alert-danger rounded-0" id="todo-not-found" style="display: none;">
                                <p class="mb-0"> There is no todo job found </p>
                            </div>
                            <ul class="d-flex flex-column-reverse todo-list">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection


@section('footer-js')
<script src="{{ url('js/todo.js') }}"></script>
@endsection