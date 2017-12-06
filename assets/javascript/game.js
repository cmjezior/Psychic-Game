function getGame() {
  let app = document.getElementById('app')
  app.style.width='320px'
  app.innerHTML = ''
  app.style.textAlign='center'
  app.style.margin='auto'
  app.style.fontFamily='Monospace'
  app.style.fontSize='2pc'
  let guessDiv = document.createElement('div')
  guessDiv.id = 'guess'
  app.append(guessDiv)
  const wordsList = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wortortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran', 'nidorina', 'nidoqueen', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'polywrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke'];

  const wordSelect = ()=>Math.floor(Math.random()*wordsList.length)
  const getLetters = name=>name.split('')
  const getUnderscores = (l,num)=>l.map(l=>l!==' '?'_&nbsp;': ' &nbsp;')
  const allGuesses=[]
  let wrongGuesses=0
  const getGuessed=(guessed,letters)=>{
    return letters.map(
      letter=>
        guessed.includes(letter)
          ?letter+'&nbsp;':(letter===' ')
          ?' &nbsp;':'_&nbsp;')
  }
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200
  canvas.style.margin='10px'
  canvas.style.marginLeft='15px'
  canvas.id='hangman'
  let hanger = {
    1:[[20,180],[150,180]],
    2:[[50,180],[50,50]],
    3:[[50,50],[100,50]],
    4:[[50,150],[80,180]],
    5:[[50,80],[80,50]],
    6:[[100,50],[100,90]],
    8:[[100,110],[100,130]],
    9:[[90,125],[100,115]],
    10:[[100,115],[110,125]],
    11:[[100,130],[95,145]],
    12:[[100,130],[105,145]],
  }

  const deadMan = ()=>{
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.lineTo(95,97)
    ctx.lineTo(98,100)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(98,97)
    ctx.lineTo(95,100)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(101,97)
    ctx.lineTo(104,100)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(104,97)
    ctx.lineTo(101,100)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(100,106,4,Math.PI,Math.PI*2,false)
    ctx.stroke()

  }
  const livingMan = ()=>{
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.lineTo(170,180)
    ctx.lineTo(175,165)
    ctx.lineTo(180,180)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(175,165)
    ctx.lineTo(175,145)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(175,135,10,0,Math.PI*2,false)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(165,155)
    ctx.lineTo(175,150)
    ctx.lineTo(185,155)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(175,135,5,0,Math.PI,false)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(172,131,1,1,Math.PI*2,false)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(178,131,1,1,Math.PI*2,false)
    ctx.fill()
   }
  const fill=(no)=>{
    const ctx = canvas.getContext('2d')
      ctx.beginPath()
    if(no&&no!==7){
      ctx.lineTo(...hanger[no][0])
      ctx.lineTo(...hanger[no][1])
    } else if(no===7) {
      ctx.arc(100,100,10,0,Math.PI*2,false)
    } else {
      ctx.font ='18px Arial Bold'
      ctx.fillText('it begins...',0,20,100)
    }
    ctx.stroke()

  }

  const guessBox = document.getElementById('guess')
  guessBox.style.fontFace='Arial'
  guessBox.style.fontSize='2pc'
  guessBox.style.padding='16px'

  const printAll = guess=> guessBox.innerHTML=guess
  const guessed=(letter,name)=>name.indexOf(letter)
  let noOfGuesses=0
  const name = wordsList[wordSelect()]
  const letters = getLetters(name)
  const underscores = getUnderscores(letters).join('')
  const allRight = () => {
    let win = true;
    letters.forEach(letter=>{
      if(!allGuesses.includes(letter)&&letter!==' ') {
        win = false;
      }
    })
    return win
  }
  const addGuess=e=>{
    e.preventDefault()
    noOfGuesses++
    let inp = document.querySelector('input')
    const theGuess = e.target.value
    const newGuess= guessed(theGuess,letters)
    if(newGuess===-1) {
      if(!allGuesses.includes(theGuess)) {
        fill(wrongGuesses++)
        let removeColor = 255-(wrongGuesses*10)
        inp.style.color = `rgb(${removeColor},0,0)`
        inp.style.background=`rgb(255,255,255)`

      }
    }
    allGuesses.push(theGuess.toLowerCase())
    let win = allRight()
    let guessText =  wrongGuesses
    ?' ' + wrongGuesses +' wrong'+(wrongGuesses>1?' guesses':' guess')
    :''
    if(wrongGuesses>12||win) {
      inp.removeEventListener('keyup',addGuess)
      inp.value = ''
      inp.placeholder = !win?'Better luck next time.. ':'Win!'
      inp.disabled=true
      win?livingMan():deadMan()


      let link = document.createElement('a')
      link.href ='https://www.pokemon.com/us/pokedex/'+letters.join('')
      link.innerHTML = printAll(letters.join(''))
      link.target = '_blank'
      let text = document.createElement('p')
      text.innerHTML = `You've identified a new Pokemon! Click their name to learn more.<br>`
      text.style.fontSize='1pc'
      link.style.textDecoration='none'
      link.style.color='#005999'
      app.prepend(link)
      link.before(text)
      app.removeChild(document.querySelector('#guess'))
    } else {
      e.target.value=''
      const ptext = 'guessed ' + theGuess.toUpperCase() + guessText
      e.target.placeholder = ptext

      const guessedWord = getGuessed(allGuesses,letters).join('')
      printAll(guessedWord)
    }

  }
  printAll(underscores)

  const input = document.createElement('input')
  input.style.width='20pc'
  input.style.padding='10px'
  input.style.marginTop = '10px'
  input.placeholder= 'enter your guesses'
  input.addEventListener('keyup',addGuess)
  input.style.outline='none'
  input.style.fontSize='1.5pc'
  input.style.textAlign = 'center'
  input.style.border='none'
  app.append(input)
  input.focus()
  app.append(canvas)
}
let button = document.createElement('button')
button.innerText='New Adventure'
button.style.textAlign='center'
button.style.margin='auto'
button.addEventListener('click',getGame)
document.getElementById('app').before(button)
getGame()
