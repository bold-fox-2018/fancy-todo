<template>
    <!--Navbar -->
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color">
        <div class="container">
    <a class="navbar-brand" href="#">Fancy Todo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
        aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
            <router-link class="nav-link" to="/login">
            <i class="fas fa-door-open"></i> Login
            <span class="sr-only">(current)</span>
            </router-link>
        </li>
        <li class="nav-item" @click="setLogout">
            <a href="#" class="nav-link">
            <i class="fas fa-door-closed"></i> Logout</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-user"></i> Profile </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
            <a class="dropdown-item" href="#">My account</a>
            </div>
        </li>
        </ul>
    </div>
    </div>
    </nav>
<!--/.Navbar -->
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'Navbar',
    methods: {
        ...mapMutations(['setLogout'])
    }
}
</script>

