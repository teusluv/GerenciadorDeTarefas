document.addEventListener('DOMContentLoaded', () => {
    const tarefaInput = document.getElementById('tarefa-input');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const listaDeTarefas = document.getElementById('lista-de-tarefas');
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const limparConcluidasBtn = document.getElementById('limpar-concluidas-btn');

    function salvarTarefas() {
        const tarefas = [];
        document.querySelectorAll('#lista-de-tarefas li').forEach(li => {
            tarefas.push({
                id: li.dataset.id,
                descricao: li.querySelector('span').textContent,
                concluida: li.classList.contains('concluida')
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        tarefas.forEach(tarefa => adicionarElementoTarefa(tarefa.descricao, tarefa.concluida, tarefa.id));
    }

    adicionarBtn.addEventListener('click', () => {
        const descricao = tarefaInput.value.trim();
        if (descricao !== "") {
            const novoId = Date.now().toString();
            adicionarElementoTarefa(descricao, false, novoId);
            salvarTarefas();
            tarefaInput.value = '';
        }
    });

    tarefaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            adicionarBtn.click();
        }
    });

    function adicionarElementoTarefa(descricao, estaConcluida, id) {
        const li = document.createElement('li');
        li.setAttribute('data-id', id);

        if (estaConcluida) {
            li.classList.add('concluida');
        }
        
        li.innerHTML = `
            <span>${descricao}</span>
            <button class="remover-btn">&times;</button>
        `;
        
        listaDeTarefas.appendChild(li);

        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                li.classList.toggle('concluida');
                salvarTarefas();
            }
        });

        const removerBtn = li.querySelector('.remover-btn');
        removerBtn.addEventListener('click', () => {
            li.style.opacity = '0';
            setTimeout(() => {
                listaDeTarefas.removeChild(li);
                salvarTarefas();
            }, 300);
        });

        const span = li.querySelector('span');
        span.addEventListener('dblclick', () => {
            const inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.value = span.textContent;
            li.replaceChild(inputEdicao, span);
            inputEdicao.focus();

            inputEdicao.addEventListener('blur', () => salvarEdicao(inputEdicao, li, span));
            inputEdicao.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    salvarEdicao(inputEdicao, li, span);
                }
            });
        });
    }

    function salvarEdicao(inputEdicao, li, span) {
        const novaDescricao = inputEdicao.value.trim();
        if (novaDescricao !== "") {
            span.textContent = novaDescricao;
        }
        li.replaceChild(span, inputEdicao);
        salvarTarefas();
    }


    botoesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
           
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            const filtro = btn.dataset.filtro;
            const tarefas = document.querySelectorAll('#lista-de-tarefas li');
            
            tarefas.forEach(tarefa => {
                const isConcluida = tarefa.classList.contains('concluida');
                switch (filtro) {
                    case 'todos':
                        tarefa.style.display = 'flex';
                        break;
                    case 'ativas':
                        tarefa.style.display = isConcluida ? 'none' : 'flex';
                        break;
                    case 'concluidas':
                        tarefa.style.display = isConcluida ? 'flex' : 'none';
                        break;
                }
            });
        });
    });

    limparConcluidasBtn.addEventListener('click', () => {
        document.querySelectorAll('#lista-de-tarefas li.concluida').forEach(li => {
            li.style.opacity = '0';
            setTimeout(() => {
                listaDeTarefas.removeChild(li);
                salvarTarefas();
            }, 300);
        });
    });
    carregarTarefas();
});