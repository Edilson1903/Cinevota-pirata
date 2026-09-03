// ==========================================
// CONFIGURAÇÃO DO SUPABASE
// ==========================================
const SUPABASE_URL = 'https://grxrzlsoorgtjwoukdsk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeHJ6bHNvb3JndGp3b3VrZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNTczMjYsImV4cCI6MjEwMzkzMzMyNn0.Yr_AjvjWzZoedzTO1dttJLO99cH2ID0uxR5FGZ1PGx4';

// ==========================================
// INICIALIZAÇÃO DO SUPABASE
// ==========================================
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("🏴‍☠️ Supabase inicializado com sucesso!");

// ==========================================
// TESTE SIMPLES - MOSTRA OS FILMES
// ==========================================
async function carregarFilmes() {
    const grid = document.getElementById('filmes-grid');
    const loading = document.getElementById('loading-filmes');

    try {
        const { data, error } = await supabase
            .from('filmes')
            .select('*')
            .order('titulo');

        if (error) {
            console.error('❌ Erro:', error);
            loading.textContent = '❌ Erro: ' + error.message;
            loading.style.display = 'block';
            return;
        }

        if (!data || data.length === 0) {
            loading.textContent = '📭 Nenhum filme encontrado!';
            loading.style.display = 'block';
            return;
        }

        console.log('✅ Filmes carregados:', data.length);
        loading.style.display = 'none';
        grid.style.display = 'grid';

        grid.innerHTML = data.map(filme => `
            <div class="filme-card" data-id="${filme.id}">
                <span class="emoji">${filme.imagem || '🎬'}</span>
                <h3>${filme.titulo}</h3>
                <span class="genero">${filme.genero || 'Gênero'}</span>
                <span class="ano">${filme.ano || ''}</span>
                <p class="sinopse">${filme.sinopse}</p>
                <button class="votar-btn" data-id="${filme.id}">🗡️ Escolher</button>
            </div>
        `).join('');

        document.getElementById('status-text').textContent = '🎯 ' + data.length + ' filmes carregados!';
        document.getElementById('status-text').className = 'status-nao-votou';

    } catch (error) {
        console.error('💥 Erro fatal:', error);
        loading.textContent = '❌ Erro: ' + error.message;
        loading.style.display = 'block';
    }
}

// Executa quando a página carregar
document.addEventListener('DOMContentLoaded', carregarFilmes);