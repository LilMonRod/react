/*
*    const data = [
*        React.createElement('h1', {className:'title'}, 'Hello word'),
*        React.createElement('p', {className:'content'}, 'Download the React DevTools for a better development experience: https://fb.me/react-devtoolsYou might need to use a local HTTP server (instead of file://): https://fb.me/react-devtools-faq')
*    ]
*    ReactDOM.render(
*        data,
*        document.getElementById('root')
*    )
*/

function Title(props) {
  return React.createElement('h1', { className: 'title', title: props.title }, `${props.title}`);
}

function Paragraph(props) {
  return React.createElement('p', { className: 'content' }, `${props.content}`);
}

function Img(props) {
  return React.createElement('img', { className: 'img', src: props.src });
}

function Card(props) {
  return React.createElement('div', { className: 'card card-sm-12 card-md-4' },
    [
      React.createElement(Img, { src: props.src }),
      React.createElement(Title, { title: props.title }),
      React.createElement(Paragraph, { content: props.content })
    ]);
}

function Renderator(props) {
  
  ReactDOM.render(
    React.createElement('div', { props }, iterator(props)),
    document.getElementById('root')
  )
}

function iterator(props) {
  let container = [];

  for (const prop in props) {
    let item = getEpisodesItem(props[prop]);
    container.push(item);
  }

  return container;
}

function getEpisodesItem(data) {
  const defaultSrc = 'http://static.tvmaze.com/uploads/images/medium_landscape/128/320259.jpg';
  const src = data.image;
  let idtitle = data.id + 'title';
  let idimg = data.id + 'img';
  let idp = data.id + 'paragraph';
  return React.createElement('div', { className: 'card card-sm-12 card-md-4', key: data.id },
    [
      React.createElement(Img, { src: src ? src.medium : defaultSrc, key: idimg }),
      React.createElement(Title, { title: data.name, key: idtitle }),
      React.createElement(Paragraph, { content: data.summary, key: idp })
    ]);
}

fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
  .then((response) =>
    response.json())
  .then(data => Renderator(data._embedded.episodes));