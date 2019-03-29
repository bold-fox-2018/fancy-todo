<template>
    <div class="row">
	<div class="col-6">
	  <form class="input-group mb-3">
	    <input type="text" name="search" id="search" class="form-control" placeholder="Search..." />
	    <div class="input-group-append">
	      <button class="btn btn-outline-secondary" type="submit">Search</button>
	    </div>
	  </form>
	  <div class="card mt-2">
          <!-- {{._id}} -->
	    <div class="card-body">
	      <h5 class="card-title"></h5>
	      <a href="#" class="btn btn-primary mr-2">See detail</a>
	      <a href="/" class="btn btn-danger">Delete</a>
	    </div>
	  </div>
	</div>

    <!-- detail  -->
	<div class="col-6">
	  <div class="card">
	    <div class="card-header">
	      Detail
	    </div>
	    <div class="card-body">
	      <h5 class="card-title"></h5>
	      <p class="card-text">
	      <strong>Description</strong>:<br>{{detail.description}}<br><br>
	      <strong>Status Todo</strong>{{detail.imdbRating}}
	      </p>
	    </div>
	  </div>
	</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'listTodo',
    data(){
        return {
            todo: [],
            description: '',
            status: '',
        }
    },
    methods: {
        listTodo(){
            axios
                .get('http://localhost:3000/todos/data')
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>
