const getFirstPage = () => {
  const fakeArticles = {
    headline: {
      url: 'posts/123456',
      title: 'Snowing hard this week',
      subtitle: 'Montepelier will have a lot of snow today',
      image: 'https://monosnap.com/file/MPTTcBp3h8e2by9o7YB4p437Ckux8g.png'
    },
    articles: [
      { url: '/posts/569878', title: 'John closed', subtitle: 'John store closed yesterday', image: 'https://monosnap.com/file/QYowGO3y9hIyRH8c6FuhXsR5X9XJBU.png' },
      { url: '/posts/948382', title: 'Taxi vs Uber', subtitle: 'Who will win that battle in Montepelier', image: 'https://monosnap.com/file/GOtFNlrmvq0NGgRTV8nX0K5oTuT1iZ.png' },
      { url: '/posts/838495', title: 'New Graffito', subtitle: 'The wall has a new Graffito', image: 'https://monosnap.com/file/csxHA93yyHdaFd1PoL7H8eDV44f6lW.png' },
      { url: '/posts/348569', title: 'Murder on downtown', subtitle: 'Yesterday downtown have a murder', image: 'https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png' }
    ]
  };

  return new Promise(resolve => {
    resolve(fakeArticles)
  })
}

module.exports = {
  getFirstPage
}
