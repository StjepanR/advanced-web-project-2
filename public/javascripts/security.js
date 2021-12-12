function toggle_security() {
    var form = document.getElementById('form')
    var action = document.getElementById('security').checked ? '/safe' : '/unsafe';

    form.action = form.action + action;
}