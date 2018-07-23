import Header from "./partials/header.js";
import Footer from "./partials/footer.js";

const ArticleDetails = ctx => {
  ctx = Object.assign({}, ctx, {
    title: ctx.article.title + " - NewsInCity"
  });

  return `
    ${Header(ctx)}

    <div class="nic-view nic-article-view" data-nic-view-position="right">
      <main class="nic-view__content">
        <article class="nic-article-detail">
          <header class="nic-article__header">
            <h1>${ctx.article.title}</h1>

            <figure class="nic-article-image nic-image nic-js-image" data-image="${ctx.article.image}" data-image-alt="${ctx.article.title}">
              <div class="nic-image-responsive__container">
                <span class="nic-image-a11y">Image</span>
                <img class="nic-image__img" alt="Main article picture" src="${ctx.article.image}">
              </div>

              <figcaption class="nic-image__caption">Picture of Antonio</figcaption>
            </figure>

            <div class="nic-authors">
              <p class="nic-authors__details">
                By
                <a class="nic-author__link" href="/authors/12345">John Smith</a>
              </p>
            </div>
          </header>

          <p class="nic-post-media-p">${'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.'}</p>
          <p class="nic-post-media-p">${'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.'}</p>
          <p class="nic-post-media-p">${'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.'}</p>
          <p class="nic-post-media-p">${'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.'}</p>
          <p class="nic-post-media-p">${'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.'}</p>
        </article>
      </main>
    </div>

    ${Footer(ctx)}
  `;
};

export default ArticleDetails;
