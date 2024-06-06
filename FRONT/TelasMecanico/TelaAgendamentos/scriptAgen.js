document.addEventListener("DOMContentLoaded", function () {
    // Botões de ação
    var btnRealizarAgendamento = document.getElementById("btn-realizar-agendamento");
    var btnVerAgendamentos = document.getElementById("btn-ver-agendamentos");

    // Seções de conteúdo
    var horariosSection = document.getElementById("horarios-section");
    var agendamentoSection = document.getElementById("agendamento-section");

    // Exibe as seções de horários e agendamento ao clicar no botão "Realizar agendamento"
    btnRealizarAgendamento.addEventListener("click", function () {
        horariosSection.style.display = "block";
        agendamentoSection.style.display = "block";
    });

    // Esconde as seções ao clicar no botão "Ver agendamentos" (sem função adicional)
    btnVerAgendamentos.addEventListener("click", function () {
        horariosSection.style.display = "none";
        agendamentoSection.style.display = "none";
        // Adicione a lógica para exibir os agendamentos aqui
    });

    // Array de horários disponíveis
    var horarios = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    var horariosList = document.getElementById("horarios-list");

    // Para cada horário disponível, cria um botão na lista
    horarios.forEach(function (horario) {
        var btn = document.createElement("button");
        btn.textContent = horario;
        btn.className = "btn-horario";
        btn.addEventListener("click", function () {
            if (!btn.classList.contains("agendado")) {
                document.querySelectorAll('.btn-horario').forEach(function (element) {
                    element.classList.remove('agendado');
                });
                agendarHorario(horario, btn);
            }
        });
        horariosList.appendChild(btn);
    });

    // Função para agendar um horário
    function agendarHorario(horario, btn) {
        // Marca o botão como agendado
        btn.classList.add("agendado");
        // Preenche os campos do formulário com o horário selecionado
        document.getElementById("horario").value = horario;
    }

    // Inicialização do datepicker para o ícone do calendário
    $("#calendario-icon").datepicker({
        showOn: "button",
        buttonImage: "https://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Selecionar data",
        onSelect: function (dateText, inst) {
            // Função a ser executada quando uma data é selecionada no datepicker
            document.getElementById("data").value = dateText;
        },
        dateFormat: 'yy/mm/dd',
        regional: 'pt-BR'
    });

    // Exibe o datepicker ao clicar no ícone do calendário
    document.getElementById("calendario-icon").addEventListener("click", function () {
        $("#calendario-icon").datepicker("show");
    });

    // Função para enviar o formulário de agendamento
    document.getElementById("agendamento-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var agendamentoData = {
            data: document.getElementById("data").value,
            horario: document.getElementById("horario").value,
            local: document.getElementById("local").value,
            nomeOficina: document.getElementById("nomeOficina").value,
            tipoServico: document.getElementById("tipoServico").value,
            usuarioId: 1  // Substitua pelo ID correto do usuário
        };

        fetch('http://10.110.12.3:8080/api/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamentoData)
        })
        .then(response => {
            if (response.ok) {
                alert('Agendamento criado com sucesso!');
                // Redirecionar ou atualizar a página, se necessário
            } else {
                alert('Erro ao criar agendamento.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao criar agendamento.');
        });
    });
});
