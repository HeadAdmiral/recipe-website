//import VueMaterial from '/recipe-website/vue-material/dist/vue-material.js'

function startApp() {
  Vue.use(VueMaterial)

  new Vue({
    el: '#app',
    components: { App.vue },
    template: '<App/>'
  })
}

// ===================
// ===== GENERAL =====
// ===================

function newTab(url) {
  let tab = window.open(url, '_blank');
  tab.focus();
}

function setURL(url) {
  document.location.href = url;
}

function getPage(){
  return location.pathname.split("/").pop();
}

function urlContains(string) {
  return window.location.href.indexOf(string) !== -1
}

function getMonth(date) {
  return date.split("/")[0];  
}

function getDay(date) {
  return date.split("/")[1];  
}

function getYear(date) {
  return date.split("/")[2];  
}

// ====================
// ===== FIREBASE =====
// ====================

function initDatabase(){
  const config = {
      apiKey: "AIzaSyAchMHl30dBGYZHfVJR3ch12jFCpReQSdM",
      authDomain: "devicepitstop-imsdb.firebaseapp.com",
      databaseURL: "https://devicepitstop-imsdb.firebaseio.com",
      projectId: "devicepitstop-imsdb",
      storageBucket: "devicepitstop-imsdb.appspot.com",
      messagingSenderId: "658605927128"
    };
  
    const app = firebase.initializeApp(config);
    const settings = {
      timestampsInSnapshots: true  
    };
  database = firebase.firestore();
  database.settings(settings);
}  

function remove(collection, doc) {
  database.collection(collection).doc(doc).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      alert("An error occurred while processing your request. Please try again.");
  });  
}

function removeAll(collection) {
  let docs = getAll(collection);
  setTimeout(function() {
    for (let i = 0; i < docs.length; i++){
      remove(collection, docs[i].sku);
    }
  }, 1000);
}

function save(collection, doc, json) {
  database.collection(collection).doc(doc).set(json)
  .then(function(){
        console.log("Document successfully written!");
        if (getPage().indexOf("storestock") !== -1 && getPage().indexOf("storestock.html") == -1){
          setURL(getHomePage() + "storestock.html");
        }
        else if (getPage().indexOf("returns-tracker") !== -1 && getPage().indexOf("returns-tracker.html") == -1){
          setURL(getHomePage() + "returns-tracker.html");
        }
        else if (getPage().indexOf("buy-sale-tracker") !== -1 && getPage().indexOf("buy-sale-tracker.html") == -1){
          setURL(getHomePage() + "/buy-sale-tracker.html");
        }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        alert("An error occurred while processing your request. Please try again.");
    });
}

function get(collection, doc) {
    database.collection(collection).doc(doc).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function getWhere(collection, field, operator, expected) {
  let array = [];
  database.collection(collection).where(field, operator, expected).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}
  
function getWhereWhere(collection, field1, operator1, expected1, field2, operator2, expected2) {
  let array = [];
  database.collection(collection).where(field1, operator1, expected1).where(field2, operator2, expected2).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}

function getWhereWhereWhere(collection, field1, operator1, expected1, field2, operator2, expected2, field3, operator3, expected3) {
  let array = [];
  database.collection(collection).where(field1, operator1, expected1)
                                 .where(field2, operator2, expected2)
                                 .where(field3, operator3, expected3).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}

function getAll(collection) {
  let array = [];
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        array.push(doc.data());
    });
  });
  return array;
}

function merge(collection, doc, json) {
    database.collection(collection).doc(doc).set(json, { merge: false });
}

function update(collection, doc, json) {
    database.collection(collection).doc(doc).update(json)
      .then(function() {
        console.log("Document successfully updated!");
        if (getPage().indexOf("storestock") !== -1 && getPage().indexOf("storestock.html") == -1){
          setURL(getHomePage() + "storestock.html");
        }
        else if (getPage().indexOf("returns-tracker") !== -1 && getPage().indexOf("returns-tracker.html") == -1){
          setURL(getHomePage() + "returns-tracker.html");
        }
        else if (getPage().indexOf("buy-sale-tracker") !== -1 && getPage().indexOf("buy-sale-tracker.html") == -1){
          setURL(getHomePage() + "buy-sale-tracker.html");
        }
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
}
