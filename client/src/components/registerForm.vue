<template>
    <div class="col mt-5" style="display:flex; justify-content: center; align-items: center;">
        <form class="text-center border border-light p-5" @submit.prevent="register">
            <p class="h4 mb-4">Sign up</p>

            <div class="form-row mb-4">
                <div class="col">
                    <!-- First name -->
                    <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name" v-model="firstName">
                </div>
                <div class="col">
                    <!-- Last name -->
                    <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name" v-model="lastName">
                </div>
            </div>

            <!-- E-mail -->
            <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="email">

            <!-- Password -->
            <input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" v-model="password">
            <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                At least 8 characters and 1 digit
            </small>


            <!-- Newsletter -->
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter">
                <label class="custom-control-label" for="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
            </div>

            <!-- Sign up button -->
            
                <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button>
            
            <!-- Social register -->


            <!-- Terms of service -->

        </form>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import axios from 'axios'


export default {
    name: 'register',
    data(){
        return {
            name: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapMutations(['setLogin']),

        register () {
            let new_user = {
                name: `${this.firstName} ${this.lastName}`,
                email: this.email,
                password: this.password
            }
            axios
                .post('http://localhost:3000/users/register', new_user)
                .then((data) => {
                    this.$router.push('login')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>
