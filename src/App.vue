<template>
    <v-app class="grey lighten-4">
        <Navbar/>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Navbar from '@/components/Navbar'

    export default {
        name: 'App',
        components: {Navbar},
        data() {
            return {
                //
            }
        },
        methods: {
            // initDatabase: function () {
            //
            //
            //     const app = firebase.initializeApp(config);
            //     const settings = {
            //         timestampsInSnapshots: true
            //     };
            //     database = firebase.firestore();
            //     database.settings(settings);
            //     return database;
            // },
            // getID: function() {
            //     let date = new Date;
            //     return date.getTime();
            // },
            // getKeyword: function() {
            //     return document.getElementById("search").value;
            // },
            save: function(collection, doc, json) {
                console.log(this.initDatabase());
                database.collection(collection).doc(doc).set(json)
                .then(function(){
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        }
    }
</script>
