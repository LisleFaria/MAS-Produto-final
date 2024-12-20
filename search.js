const fakeClasses = [
    { id: 1, name: "Yoga e Bem-Estar Integral", category: "Yoga", link: "aula yoga1.html" },
    { id: 2, name: "Dinâmicas de Yoga e Consciência corporal", category: "Yoga", link: "aula yoga2.html" },
    { id: 3, name: "Força e Movimento Funcional", category: "Crossfit", link: "aula crossfit1.html" },
    { id: 4, name: "Condicionamento  de Alta Performance", category: "Crossfit", link: "aula crossfit2.html" },
    { id: 5, name: "Kickboxing e Preparação Física", category: "Kickboxing", link: "aula kickboxing1.html" },
    { id: 6, name: "Técnicas de Combate e Força", category: "Kickboxing", link: "aula kickboxing2.html" },
    { id: 7, name: "Força, Flexibilidade e Postura", category: "Pilates", link: "aula pilates1.html" },
    { id: 8, name: "Pilates e Equilíbrio Corporal", category: "Pilates", link: "aula pilates2.html" }
];

function filterClasses() {
    const searchQuery = document.getElementById("searchQuery").value.toLowerCase();
    const selectedCategories = [];
    if (document.getElementById("category1").checked) selectedCategories.push("Yoga");
    if (document.getElementById("category2").checked) selectedCategories.push("Crossfit");
    if (document.getElementById("category3").checked) selectedCategories.push("Kickboxing");
    if (document.getElementById("category4").checked) selectedCategories.push("Pilates");

    // Verifica se ambos os campos estão vazios
    const noSearchQuery = searchQuery.trim() === "";
    const noSelectedCategories = selectedCategories.length === 0;

    // Retorna apenas as aulas que atendem aos filtros
    const filteredClasses = fakeClasses.filter(cls => {
        const matchesSearch = cls.name.toLowerCase().includes(searchQuery);
        const matchesCategory = noSelectedCategories || selectedCategories.includes(cls.category);
        return matchesSearch && matchesCategory;
    });

    const classResults = document.getElementById('classResults');

    // Exibe os resultados filtrados
    if (filteredClasses.length > 0) {
        classResults.innerHTML = filteredClasses.map(cls =>
            `<div class="result-item" data-id="${cls.id}"><a href="${cls.link}">${cls.name} (${cls.category})</a></div>`
        ).join('');
        classResults.style.display = 'block';
    } else if (noSearchQuery && noSelectedCategories) {
        // Se não houver filtros ou pesquisa, exibe uma mensagem
        classResults.innerHTML = '<p>Use a pesquisa ou filtros para encontrar aulas.</p>';
        classResults.style.display = 'block';
    } else {
        // Exibe uma mensagem se nenhum resultado for encontrado
        classResults.innerHTML = '<p>Não foram encontradas aulas.</p>';
        classResults.style.display = 'block';
    }

    // Adiciona o evento de clique nas aulas encontradas
    document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', function () {
            const classId = parseInt(this.getAttribute('data-id'));
            const selectedClass = fakeClasses.find(cls => cls.id === classId);
            if (selectedClass) {
                // Salva a aula selecionada no localStorage
                localStorage.setItem('aulaSelecionada', JSON.stringify(selectedClass));
                console.log('Aula selecionada e salva no localStorage:', selectedClass);
            }
        });
    });
}

// Corrige o evento do botão de filtro
document.getElementById('toggleFilters').addEventListener('click', function () {
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
        filterContainer.style.display = 'block';
    } else {
        filterContainer.style.display = 'none';
    }
});