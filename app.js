const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'notas.json');

// Garante que o arquivo existe
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf8');
}

// Função para ler as notas
function lerNotas() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Função para salvar as notas
function salvarNotas(notas) {
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2), 'utf8');
}

// Função para adicionar uma nota
function adicionarNota(titulo, conteudo) {
  const notas = lerNotas();
  notas.push({ titulo, conteudo });
  salvarNotas(notas);
  console.log(`Nota "${titulo}" adicionada!`);
}

// Função para listar as notas
function listarNotas() {
  const notas = lerNotas();
  console.log('\n📌 Suas Notas:');
  notas.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo} - ${nota.conteudo}`);
  });
}

// Função para deletar uma nota
function deletarNota(titulo) {
  let notas = lerNotas();
  const notasFiltradas = notas.filter(nota => nota.titulo !== titulo);

  if (notas.length === notasFiltradas.length) {
    console.log(`Nota "${titulo}" não encontrada.`);
    return;
  }

  salvarNotas(notasFiltradas);
  console.log(`Nota "${titulo}" removida.`);
}

// Comandos via terminal
const comando = process.argv[2];
const titulo = process.argv[3];
const conteudo = process.argv[4];

if (comando === 'add') {
  adicionarNota(titulo, conteudo);
} else if (comando === 'list') {
  listarNotas();
} else if (comando === 'delete') {
  deletarNota(titulo);
} else {
  console.log('Comandos disponíveis:');
  console.log('node app.js add "Título" "Conteúdo"  ➜ Adicionar nota');
  console.log('node app.js list  ➜ Listar todas as notas');
  console.log('node app.js delete "Título"  ➜ Deletar nota');
}
