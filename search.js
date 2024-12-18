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

    const filteredClasses = fakeClasses.filter(cls => {
        const matchesSearch = cls.name.toLowerCase().includes(searchQuery);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(cls.category);
        return matchesSearch && matchesCategory;
    });

    const classResults = document.getElementById('classResults');
    
    // Exibe os resultados ou diz que não tem aulas
    if (filteredClasses.length > 0) {
        classResults.innerHTML = filteredClasses.map(cls => 
            `<div class="result-item" data-id="${cls.id}"><a href="${cls.link}">${cls.name} (${cls.category})</a></div>`
        ).join('');
        classResults.style.display = 'block';
    } else {
        classResults.innerHTML = '<p>Não foram encontradas aulas.</p>';
        classResults.style.display = 'block';
    }

    // Agora vamos adicionar o evento de clique nas aulas
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

    // Se não tiver filtros ativos e a pesquisa vazia, exibe todas as aulas
    if (selectedCategories.length === 0 && searchQuery === '') {
        displayAllClasses();
    }
}

document.getElementById('toggleFilters').addEventListener('click', function () {
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
        filterContainer.style.display = 'block';
    } else {
        filterContainer.style.display = 'none';
    }
});