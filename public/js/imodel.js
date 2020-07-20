function postData(radio) {
    var radios = document.getElementsByTagName('input');
    var body = '';
    for(var element of radios) {
        if(element.checked) body += element.name + '=' + element.value + '&';
    }
    fetch('/imodel', {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body
    }).then(function(response) { return response.json() })
    .then(function(response) {
        if(response.error) throw response.error;
        document.getElementById('recommendation').textContent = response.recommendation;
        document.getElementById('score').textContent = 'Score: ' + response.score;
    }).catch(function(error) {
        document.getElementById('recommendation').textContent = 'Error: ' + error;
        document.getElementById('score').textContent = '';
    })
}