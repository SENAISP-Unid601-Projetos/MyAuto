document.getElementById("loginForm").addEventListener("submit", function(event) {
    // Impedir o envio padrão do formulário
    event.preventDefault();
    // Redirecionar para a página de agendamento
    window.location.href = "../TelaMecanico/TelaAgendamentos";
});