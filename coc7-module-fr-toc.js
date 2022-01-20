/* Scripts des Compendiums FR de Toc pour le système CoC7 pour Foundry VTT */

// auto réduit la barre de macros
function collapse(toggleId) {
  let target = document.getElementById(toggleId);
  if (target) {
    target.click()
  }
}

// message d'accueil à l'activation du module
async function welcomeMessage() {
  ChatMessage.create({
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
    content: '🐙 Ph\'n glui,<br />Cliquez @Compendium[coc7-module-fr-toc.fr-compendiums-journalentry.BfWJfgDbvLoJTpkC]{ici} pour accéder à toute la documentation de ces compendiums pour l\'Appel V7. Bon jeu !',
    speaker: { alias: "Cthulhu" }
  })
  game.user.setFlag("coc7-module-fr-toc", "welcomeMessageShown", true)
}

Hooks.on('ready', async function () {
  // mise à jour automatique des paramètres du système CoC7
  if (game.settings.get('CoC7', 'overrideSheetArtwork')) {
    const settings = {
      artworkMainFont: 'url(\'./modules/coc7-module-fr-toc/fonts/mailart-rubberstamp.ttf\') format(\'truetype\')',
      artworkMainFontBold: 'url(\'./modules/coc7-module-fr-toc/fonts/mailart-rubberstamp.ttf\') format(\'truetype\')',
      artworkMainFontSize: '',
      artworkBackgroundColor: 'rgba(43,55,83,1)',
      artworkFrontColor: 'rgba(43,55,83,1)',
      artworkFixedSkillLength: false,
      unitDieColorset: 'white',
      tenDieNoMod: 'black',
      tenDieBonus: 'foundry',
      tenDiePenalty: 'bloodmoon',
      displayPlayerNameOnSheet: true,
      oneBlockBackstory: true
    }
    game.settings.settings.forEach(async setting => {
      if (typeof settings[setting.key] !== 'undefined' && 
            game.settings.get('CoC7', setting.key) !== settings[setting.key]) {
              await game.settings.set('CoC7', setting.key, settings[setting.key])
      }
    })

    // message d'accueil à l'activation du module
    if (!game.user.getFlag("coc7-module-fr-toc", "welcomeMessageShown")) {
        welcomeMessage()
    }

  } else {
    await game.settings.set('CoC7', 'overrideSheetArtwork', true)
    window.location.reload()
  }

  // auto réduit la barre de macros
  collapse("bar-toggle")
})

Hooks.on('renderPause', async function () {
  // mise à jour du logo de pause
  document.getElementById("pause").children[0].setAttribute("src", "modules/coc7-module-fr-toc/images/logo.png")
  document.getElementById("pause").children[1].innerHTML = "Cthulhu dort & attend..."
})

Hooks.on('renderJournalSheet', (app, html, options) => {
  // lien direct vers un compendium
  html.on('click', 'a.pack-link', (event) => {
    const anchorElem = event.currentTarget;
    const packName = anchorElem?.dataset?.packName;
    const pack = game.packs.get(packName);
    if ( pack ) {
      pack.render(true);
    }
  })
})

// mise à jour du logo en haut à gauche
document.getElementById("logo").setAttribute("src", "modules/coc7-module-fr-toc/images/logo.png")
