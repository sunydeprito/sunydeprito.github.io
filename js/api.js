const API_KEY = '108a8f05027f4f1dbaa17b4c48e4eefa';
const LEAGUE_ID = 2021;
var base_url = "https://api.football-data.org/v2/";
var teams_url = `${base_url}competitions/${LEAGUE_ID}/teams`;
var standing_url = `${base_url}competitions/${LEAGUE_ID}/standings`;
var teamData;


var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json

function getStanding() {
  if ('caches' in window) {
  caches.match(standing_url).then(function (response) {
    if (response) {
      response.json().then(function (data) {
        standingHtml(data);
        
      });
    }
  });
}

fetchApi(standing_url)
  .then(status)
  .then(json)
  .then(function(data) {
    standingHtml(data)   
  })
  .catch(error);
}


var getTeams = () => {
 return fetchApi(teams_url)
    .then(status)
    .then(json);
}

//function getTeams() {
 // if ('caches' in window) {
  //caches.match(teams_url).then(function (response) {
   // if (response) {
     // response.json().then(function (data) {
       // teamsHtml(data);
        
      //});
   // }
  //});
//}

//fetchApi(teams_url)
  //.then(status)
  //.then(json)
  //.then(function(data) {
   // teamsHtml(data)   
  //})
  //.catch(error);
//}

function getFavoriteTeams() {
  var dataDB= getFavTeams();
  dataDB.then(function(data){
  var html='';
  data.forEach(function(team){
  
    html +=`
    <div class="collection-item"> 
    
    <div class="center"><img width="50" height="50" src="${team.crestUrl}"></div>
    <div class="center">${team.name} </div>
    <div class="center">${team.area.name}</div>
    <div class="center">${team.founded}</div>
    <div class="center">${team.venue}</div>
    <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
    <div class="card-action right-align">
    <a class="waves-effect waves-light btn red" onclick="deleteTeamListener(${team.id})"><i class="material-icons right"></i>Delete from Favorite</a>
    </div>
</div>
</div>
`;
});
if(data.length == 0) html += '<h6 class="center-align">No favorite team found!</6>'
document.getElementById("fav-teams").innerHTML = html;                  
});

}


function standingHtml(data){
  var html = '';
  var content = '';

  content =  `<span class="card-title" align="center" style ="font-weight: bold;">${data.competition.name}  </span>
  `;
  data.standings[0].table.forEach(function(team){
    html+= `<tr>
    <td>${team.position}</td>
    <td><img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl}"> ${team.team.name}</td>
    <td>${team.playedGames}</td>
    <td>${team.won}</td>
    <td>${team.draw}</td>
    <td>${team.lost}</td>
    <td>${team.goalsFor}</td>
    <td>${team.goalsAgainst}</td>
    <td>${team.goalDifference}</td>
    <td>${team.points}</td>
    </tr>
  `;
  })
  document.getElementById("standing").innerHTML = html;
  document.getElementById("standingCard").innerHTML = content;

}


var getAllTeams = () => {
  var teams = getTeams()
  teams.then(data => {
    teamData = data;
    var html = ''
    html += ''
    data.teams.forEach(team => {
      html += `
             <div class="collection-item"> 
    
                   <div class="center"><img width="50" height="50" src="${team.crestUrl}"></div>
                   <div class="center">${team.name} </div>
                   <div class="center">${team.area.name}</div>
                   <div class="center">${team.founded}</div>
                   <div class="center">${team.venue}</div>
                   <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
                   <div class="card-action right-align">
                   <a class="waves-effect waves-light btn blue" onclick="insertTeamListener(${team.id})"><i class="material-icons right"></i>Add to Favorite</a>
                   </div>
            </div>
            </div>
        `
    })
    document.getElementById("teams").innerHTML = html;
  })
}




// database operations
var dbPromise = idb.open('football', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
  }
});

function insertTeam(team) {
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams')
    store.put(team)
    return tx.complete;
  }).then(function() {
    M.toast({ html: `${team.name} berhasil disimpan!` })
    console.log('Pertandingan berhasil disimpan');
  }).catch(err => {
    console.error('Pertandingan gagal disimpan', err);
  });
}

function deleteTeam(teamId) {
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(teamId);
    return tx.complete;
  }).then(function()  {
    M.toast({ html: 'Team has been deleted!' });
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification("delete brooo");
      });
  } else {
      console.error('FItur notifikasi tidak diijinkan.');
  }
    getFavoriteTeams();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

function getFavTeams() {
  return dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  })
}

var insertTeamListener = teamId => {
  var team = teamData.teams.filter(el => el.id == teamId)[0]
  insertTeam(team);
  console.log(teamId + "add to favorite")
}

var deleteTeamListener = teamId => {
  var confirmation = confirm("Delete this team?")
  if (confirmation == true) {
    deleteTeam(teamId);
    console.log(teamId + "has been deleted")
  }
}


















