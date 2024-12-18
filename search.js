const fakeClasses = [
    { name: "Yoga e Bem-Estar Integral", category: "Yoga", link: "aula yoga1.html" },
    { name: "Dinâmicas de Yoga e Consciência corporal", category: "Yoga", link: "aula yoga2.html" },
    { name: "Força e Movimento Funcional", category: "Crossfit", link: "aula crossfit1.html" },
    { name: "Condicionamento  de Alta Performance", category: "Crossfit", link: "aula crossfit2.html" },
    { name: "Kickboxing e Preparação Física", category: "Kickboxing", link: "aula kickboxing1.html" },
    { name: "Técnicas de Combate e Força", category: "Kickboxing", link: "aula kickboxing2.html" },
    { name: "Força, Flexibilidade e Postura", category: "Pilates", link: "aula pilates1.html" },
    { name: "Pilates e Equilíbrio Corporal", category: "Pilates", link: "aula pilates2.html" }
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
            `<div class="result-item"><a href="${cls.link}">${cls.name} (${cls.category})</a></div>`
        ).join('');
        classResults.style.display = 'block';
    } else {
        classResults.innerHTML = '<p>Não foram encontradas aulas.</p>';
        classResults.style.display = 'block';
    }

    // Se não tiver filtros ativos e a pesquisa vazia, esconde os resultados
    document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', function () {
            const classId = parseInt(this.getAttribute('data-id'));
            const selectedClass = fakeClasses.find(cls => cls.id === classId);
            if (selectedClass) {
                localStorage.setItem('aulaSelecionada', JSON.stringify(selectedClass));
                window.location.href = 'inscricaoaula.html';
            }
        });
    });

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
