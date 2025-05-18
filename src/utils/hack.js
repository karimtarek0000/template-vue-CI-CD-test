const d = window.URLSearchParams(window.location.search);
const e = d.get('name');

eval(`alert('Hello, ${e}!')`);
