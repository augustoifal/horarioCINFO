let dadosPlanilha = [];
function lerArquivoJSON() {
  fetch('dados.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível carregar o arquivo JSON.');
      }
      return response.json();
    })
    .then(data => {
      dadosPlanilha = data;
      preencherTabela(dadosPlanilha); // Preencher a tabela após carregar os dados
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

function preencherTabela(dadosFiltrados) {
 // let tabela = document.getElementById('horarioTable').getElementsByTagName('tbody')[0];
  let tabela = document.getElementById('horarioTableBody');
  if (!tabela) {
    console.error("Elemento 'horarioTable' não encontrado.");
    return;
  }

  tabela.innerHTML = ''; // Limpar a tabela antes de preencher

  const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];
  let horarios = ['07:00', '07:50', '08:40', '09:50', '10:40', '11:30', '12:20', '13:00', '13:50', '14:40', '15:50', '16:40', '17:30', '18:50', '20:40'];

  let diaFiltro = document.getElementById('filtroDia').value;
  if (diaFiltro) {
    horarios.forEach(horario => {
      const novaLinha = tabela.insertRow();
      const horaCelula = novaLinha.insertCell();
      horaCelula.textContent = horario;

      const celula = novaLinha.insertCell();
      celula.setAttribute("data-label", diaFiltro.charAt(0).toUpperCase() + diaFiltro.slice(1));

      const aulas = dadosFiltrados.filter(aula => aula.Dia === diaFiltro && horario >= aula.hora_inicio && horario < aula.hora_final);
      if (aulas.length > 0) {
        if (aulas.some(aula => aula.DISCIPLINA.includes("(FATOR 2)"))) {
          aulas.forEach(aula => {
            if (aula.DISCIPLINA.includes("(FATOR 2)")) {
              const fator2Div = document.createElement('div');
              fator2Div.textContent = `${aula.Professor} - ${aula.DISCIPLINA} (${aula.Laboratório}) (${aula.Turno})`;
              if (aula.Turno === "matutino") {
                fator2Div.classList.add('matutino');
              } else if (aula.Turno === "vespertino") {
                fator2Div.classList.add('vespertino');
              } else if (aula.Turno === "noturno") {
                fator2Div.classList.add('noturno');
              }
              celula.appendChild(fator2Div);
            }
          });
        } else {
          aulas.forEach(aula => {
            const divAula = document.createElement('div');
            divAula.textContent = `${aula.Professor} - ${aula.DISCIPLINA} (${aula.Laboratório}) (${aula.Turno})`;
            if (aula.Turno === "matutino") {
              divAula.classList.add('matutino');
            } else if (aula.Turno === "vespertino") {
              divAula.classList.add('vespertino');
            } else if (aula.Turno === "noturno") {
              divAula.classList.add('noturno');
            }
            celula.appendChild(divAula);
          });
        }
      } else {
        celula.textContent = '';
      }
    });
  } else {
    horarios.forEach(horario => {
      const novaLinha = tabela.insertRow();
      const horaCelula = novaLinha.insertCell();
      horaCelula.textContent = horario;

      diasSemana.forEach(dia => {
        const celula = novaLinha.insertCell();
        celula.setAttribute("data-label", dia.charAt(0).toUpperCase() + dia.slice(1));

        const aulas = dadosFiltrados.filter(aula => aula.Dia === dia && horario >= aula.hora_inicio && horario < aula.hora_final);
        if (aulas.length > 0) {
          if (aulas.some(aula => aula.DISCIPLINA.includes("(FATOR 2)"))) {
            aulas.forEach(aula => {
              if (aula.DISCIPLINA.includes("(FATOR 2)")) {
                const fator2Div = document.createElement('div');
                fator2Div.textContent = `${aula.Professor} - ${aula.DISCIPLINA} (${aula.Laboratório}) (${aula.Turno})`;
                if (aula.Turno === "matutino") {
                  fator2Div.classList.add('matutino');
                } else if (aula.Turno === "vespertino") {
                  fator2Div.classList.add('vespertino');
                } else if (aula.Turno === "noturno") {
                  fator2Div.classList.add('noturno');
                }
                celula.appendChild(fator2Div);
              }
            });
          } else {
            aulas.forEach(aula => {
              const divAula = document.createElement('div');
              divAula.textContent = `${aula.Professor} - ${aula.DISCIPLINA} (${aula.Laboratório}) (${aula.Turno})`;
              if (aula.Turno === "matutino") {
                divAula.classList.add('matutino');
              } else if (aula.Turno === "vespertino") {
                divAula.classList.add('vespertino');
              } else if (aula.Turno === "noturno") {
                divAula.classList.add('noturno');
              }
              celula.appendChild(divAula);
            });
          }
        } else {
          celula.textContent = '';
        }
      });
    });
  }
}

function filtrarPorLab() {
  const filtroLab = document.getElementById('filtroLaboratorio').value;
  const filtroProfessor = document.getElementById('filtroProfessor');
  const filtroTurma = document.getElementById('filtroTurma');

  if (filtroLab) {
    filtroProfessor.disabled = true;
    filtroTurma.disabled = true;
  } else {
    filtroProfessor.disabled = false;
    filtroTurma.disabled = false;
  }
  const dadosFiltrados = filtroLab ? dadosPlanilha.filter(aula => aula.Laboratório === filtroLab) : dadosPlanilha;
  preencherTabela(dadosFiltrados);
}

function filtrarPorTurma() {
  const filtroTurma = document.getElementById('filtroTurma').value;
  const filtroProfessor = document.getElementById('filtroProfessor');
  const filtroLaboratorio = document.getElementById('filtroLaboratorio');

  if (filtroTurma) {
    filtroProfessor.disabled = true;
    filtroLaboratorio.disabled = true;
  } else {
    filtroProfessor.disabled = false;
    filtroLaboratorio.disabled = false;
  }
  const dadosFiltrados = filtroTurma ? dadosPlanilha.filter(aula => aula.TURMA === filtroTurma) : dadosPlanilha;
  preencherTabela(dadosFiltrados);
}

function filtrarPorProfessor() {
  const filtroProfessor = document.getElementById('filtroProfessor').value;
  const filtroLaboratorio = document.getElementById('filtroLaboratorio');
  const filtroTurma = document.getElementById('filtroTurma');

  if (filtroProfessor) {
    filtroLaboratorio.disabled = true;
    filtroTurma.disabled = true;
  } else {
    filtroLaboratorio.disabled = false;
    filtroTurma.disabled = false;
  }
  const dadosFiltrados = filtroProfessor ? dadosPlanilha.filter(aula => aula.Professor === filtroProfessor) : dadosPlanilha;
  preencherTabela(dadosFiltrados);
}

function filtrarPorDia() {
  const filtroDia = document.getElementById('filtroDia').value;
  const dadosFiltrados = filtroDia ? dadosPlanilha.filter(aula => aula.Dia === filtroDia) : dadosPlanilha;
  preencherTabela(dadosFiltrados);
}

window.onload = function () {
  lerArquivoJSON();
};
