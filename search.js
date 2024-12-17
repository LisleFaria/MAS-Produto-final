const fakeClasses = [
    { name: "Yoga e Bem-Estar Integral", category: "Yoga", link: "../HTML/aula yoga1.html" },
    { name: "Dinâmicas de Yoga e Consciência corporal", category: "Yoga", link: "../HTML/aula yoga2.html" },
    { name: "Força e Movimento Funcional", category: "Crossfit", link: "../HTML/aula crossfit1.html" },
    { name: "Condicionamento  de Alta Performance", category: "Crossfit", link: "../HTML/aula crossfit2.html" },
    { name: "Kickboxing e Preparação Física", category: "Kickboxing", link: "../HTML/aula kickboxing1.html" },
    { name: "Técnicas de Combate e Força", category: "Kickboxing", link: "../HTML/aula kickboxing2.html" },
    { name: "Força, Flexibilidade e Postura", category: "Pilates", link: "../HTML/aula pilates1.html" },
    { name: "Pilates e Equilíbrio Corporal", category: "Pilates", link: "../HTML/aula pilates2.html" }
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
        classResults.style.display = 'block'; // Mostrar resultados
    } else {
        classResults.innerHTML = '<p>No classes found.</p>';
        classResults.style.display = 'block'; // Mostrar "sem resultados"
    }

    // Se não tiver filtros ativos e a pesquisa vazia, esconde os resultados
    if (selectedCategories.length === 0 && searchQuery === '') {
        classResults.style.display = 'none';
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
