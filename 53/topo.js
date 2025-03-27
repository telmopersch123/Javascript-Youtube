const head = document.head
const body = document.body

const style = `<link rel="stylesheet" href='topo.css'/>`
head.innerHTML += style;

const topo = document.createElement('div')
topo.setAttribute('id', "topo");
topo.setAttribute('class', "topo");
body.prepend(topo);

const logo =
  "<div id='logo' class='logo'>" +
  "<img src='https://s2-techtudo.glbimg.com/b5YztaIHpXYbpVYJsK0ySxOKW_w=/0x0:1344x768/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/A/h/ZskOJZQ9amSC55FcJROA/dream-studio-ai.png' title='CFBCURSOS' />" +
  "</div >";
  
topo.innerHTML += logo;

const login = "<div id='login' class='login'>" +
  "<p id='matricula'>Matrícula:<span></span></p>" +
   "<p id='nome'>Nome:<span></span></p>" +
  "</div >"
  topo.innerHTML += login;
