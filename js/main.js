
//Objeto principal do documento (Main)
const Main = {

   // propriedade init (inicio), que seu valor é uma função, responsável por iniciar as outras funções abaixo. Os nomes das propriedades são personalizados logo não são nomes reservados.
   init: function() {
      // this do inglês isso ou esse, que se refere ao Main. ou seja que a função cacheSelectors esta dentro do pai
      this.cacheSelectors() 
      this.bindEvents()
   },

   // Responsável por selecionar os elementos dentro do HTML e armazenar eles em uma variável.
   cacheSelectors: function() {
      this.$checkButtons = document.querySelectorAll('.check')
      this.$inputTask = document.querySelector('#inputTask')
      this.$list = document.querySelector('#list')
      this.$removeButtons = document.querySelectorAll('.remove')
        
         

   },

   // Responsável por adicionar eventos de cliques e evento de tecla pressionada.
   bindEvents: function() {
      const self = this // hacker para a função abaixo funcionar, declarando um nome qualquer exemplo self = this. Pois se colocar this não vai funcionar. 
      
      // forEact significa (para cada). Ou seja para cada elemento da variavel checkButtons que o botão de check, vai ser aplicado a função para cada um deles.
      this.$checkButtons.forEach(function(button){
         button.onclick = self.Events.checkButton_click  // Aqui vai chamar o self que é = this e this é o Main, que vai chamar o Events, e em seguida a função check_click.
      })

      // selecionando o inputTask onkeypress quando apertar a tecla ele chama =(self.Events.inputTask_keypress). bind (conectar o this a função abaixo)
      this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

      this.$removeButtons.forEach(function(button){
         button.onclick = self.Events.removeButton_click
      })

      
   },

      
      // Aqui somente funções relacionada a eventos
   Events: {
         
         //função do botão check
         checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done') // isdone(se estiver feito) se tiver true é pq esta concluido.

            if (isDone) {
               return li.classList.remove('done')
         } 
            li.classList.add('done')
         },

         // função do inputTask
         inputTask_keypress: function(e) {      
            const key = e.key
            const value = e.target.value

            if (key === 'Enter') {
               this.$list.innerHTML += `
                  <li> 
                     <div class="check"></div> 
                     <label class="task">
                        ${value}
                     </label>
                     <button class="remove"></button> 
                  </li>
               `
               // aqui ele limpa o campo para colocar outro valor, sem que eu precise apagar
               e.target.value = ''

               // add o evento novamente para funcionar o seletor assim que add uma  nova tarefa
               this.cacheSelectors()
               this.bindEvents()
            }
            
      
           
          },

         // função do button remove
         removeButton_click: function(e) {
            let li = e.target.parentElement

            // adicionar a classe removed da animação ao clicar no button remove
            li.classList.add('removed')

            // e depois do 300ms ele adiciona a classe hidden(escondido), que é o display: none
            setTimeout(function(){
               li.classList.add('hidden')
            },300)
         }


         
         
         

        
   
         
   }
   
}
   
Main.init()




