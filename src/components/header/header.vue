<template>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container text-black">
            <h3 class="primary-colour" >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm2.684-9l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-.564 2h-11.24l2.938 7h8.428l3.432-12h4.194zm-14.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm5.9-7-.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/>
                </svg>
                <span class="pt-5 pl-3">Online Shopping
                </span>
                </h3>
            <button @click="()=> { showMenu = !showMenu}"  class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="showMenu ? 'cutom-collapse': ''" class="collapse navbar-collapse " id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class="mr-6 nav-item active">
                        <router-link class="nav-link" :to="{name:'product'}">Purchase</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'order'}">Re-Stock</router-link>                        
                    </li> -->
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{name:'orderForm'}">Order</router-link>                        
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            showMenu: false
        }
    }
}

</script>