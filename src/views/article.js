import Head from "./partials/head.js";
import Header from "./partials/header.js";
import Footer from "./partials/footer.js";
import Scripts from "./partials/scripts.js";

const ArticleDetails = ctx => {
  ctx = Object.assign({}, ctx, {
    title: ctx.article.title + " - NewsInCity"
  });

  return `
    ${Head(ctx)}

    <div class="main-site">
      ${Header(ctx)}

      <main class="article-view js-viewContainer">
        <article class="article-detail">
          <header class="article-header">
            <h1 class="title article-view__title">${ctx.article.title}</h1>

            <figure class="article-image image js-image" data-image="${
              ctx.article.image
            }" data-image-alt="${ctx.article.title}">
              <div class="image-responsive__container">
                <span class="image-a11y">Image</span>
                <img class="image__img" alt="Main article picture" src="${
                  ctx.article.image
                }">
              </div>

              <figcaption class="image__caption">Picture of Antonio</figcaption>
            </figure>

            <div class="authors">
              <p class="authors__details">
                By
                <a class="author__link" href="/authors/12345">John Smith</a>
              </p>
            </div>
          </header>

          <div class="article-content">
            <p class="article-p">${"Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds."}</p>
            <p class="article-p">${"Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds."}</p>
            <p class="article-p">${"Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds."}</p>
            <p class="article-p">${"Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds."}</p>
            <p class="article-p">${"Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds."}</p>
          </div>
        </article>
      </main>

      ${Footer(ctx)}
    </div>

    ${Scripts({ scripts: ctx.scripts })}
  `;
};

export default ArticleDetails;
