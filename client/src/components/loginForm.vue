<template>
    <div class="col mt-5" style="display:flex; justify-content: center; align-items: center;">
            <form class="text-center border border-light p-5" @submit.prevent="actionLogin">

                <p class="h4 mb-4">Sign in</p>

                <!-- Email -->
                <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="email">

                <!-- Password -->
                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" v-model="password">

                <div class="d-flex justify-content-around">
                    <div>
                        <!-- Remember me -->
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                            <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <!-- Forgot password -->
                        <a href="" >Forgot password?</a>
                    </div>
                </div>
                

                <!-- Sign in button -->
                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

                <!-- Register -->
                <p>Not a member?
                    <router-link to="/register">Register</router-link>
                </p>

            </form>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import axios from 'axios'

export default {
    name: 'formLogin',
    data(){
        return {
            email: '',
            password: ''  
        }
    },
    methods: {
        actionLogin(){
            let login = {
                email: this.email,
                password: this.password
            }
            axios
                .post('http://localhost:3000/users/login', login)
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    this.$router.push('home')
                })
                .catch((err) => {
                console.log(err)
                })
            }
    }
    
}
</script>


