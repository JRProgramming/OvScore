function postData(radio) {
    var radios = document.getElementsByTagName('input');
    var url = '';
    for(var i=0; i<radios.length; i++) {
        if(radios[i].checked) url += radios[i].name + '=' + radios[i].value + '&';
    }
    fetch('/imodel', {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: url.slice(0, -1)
    }).then(response => response.json())
    .then(response => {
        console.log(response);
        if(response.error) throw response.error;
        document.getElementById('recommendation').textContent = response.recommendation;
        document.getElementById('score').textContent = 'Score: ' + response.score;
    }).catch(error => {
        document.getElementById('recommendation').textContent = 'Error: ' + error;
        document.getElementById('score').textContent = '';
    })
}