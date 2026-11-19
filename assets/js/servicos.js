/* Preços em centavos, na ordem: 8 dias úteis, 3 dias úteis, mesmo dia. null indica consulta à loja. */
const CATALOGO = {
  categorias: {
    limpeza: ['Higienização', 'Limpeza por dentro, por fora e na sola, com cuidado para cada material.', 'spark'],
    clareamento: ['Clareamento', 'Tratamentos para manchas persistentes e oxidação da borracha.', 'sun'],
    hidratacao: ['Hidratação e proteção', 'Cuidado para couro e borracha e proteção contra líquidos e sujeira.', 'drop'],
    pintura: ['Pintura e pigmentação', 'Renove a cor de uma área desgastada ou do calçado inteiro.', 'brush'],
    camurca: ['Camurça', 'Recupere a textura e a coloração desse material delicado.', 'layers'],
    odor: ['Odorizante', 'Tratamento para eliminar odores indesejáveis.', 'wind'],
    reparos: ['Reparos', 'Avaliação de solas, colagens e outros pequenos reparos.', 'tool'],
    bones: ['Bonés', 'Higienização, hidratação, pintura e customização sob consulta.', 'cap'],
    bolsas: ['Bolsas', 'Higienização interna e externa, hidratação e renovação de cor.', 'bag']
  },
  calcados: [
    ['geral','limpeza','Higienização Geral','Interna, externa e sola',[6999,13999,20999]],
    ['externo','clareamento','Clareamento Externo','Manchas que não saem na higienização',[4999,9999,12999]],
    ['interno','clareamento','Clareamento Interno','',[4999,9999,12999]],
    ['midsole','clareamento','Clareamento Midsole','Retira a oxidação da borracha',[4999,9999,12999]],
    ['impermeabilizacao','hidratacao','Impermeabilização','Proteção contra líquidos e sujeira',[3999,7999,11999]],
    ['couro','hidratacao','Hidratação do Couro','',[3999,7999,11999]],
    ['borracha','hidratacao','Hidratação da Borracha','',[3999,7999,11999]],
    ['pintura-total','pintura','Pintura (Completa)','',[14999,29999,39999]],
    ['pintura-detalhe','pintura','Pintura (Detalhe)','Arranhões e desgastes mínimos',[5999,11999,17999]],
    ['pigmentacao-total','pintura','Pigmentação (Completa)','Camurça e nobuck',[14999,29999,39999]],
    ['pigmentacao-detalhe','pintura','Pigmentação (Detalhe)','',[5999,11999,17999]],
    ['camurca','camurca','Restauração de Camurça','Textura e coloração',[3999,7999,11999]],
    ['odor','odor','Odorizante','Elimina odores indesejáveis',[4999,9999,14999]],
    // TODO: confirmar preços dos serviços abaixo e o nome do último reparo.
    ['ice','reparos','Tratamento de Sola Ice','Clareia amarelados',null],
    ['tecido','reparos','Colagem/Troca de tecido auto colante','',null],
    ['vulcanizacao','reparos','Vulcanização','Colagem completa',null],
    ['colagem','reparos','Colagem','Pequenos reparos',null],
    ['troca','reparos','Troca de …','Serviço a confirmar',null]
  ],
  // TODO: confirmar preços para bonés e bolsas.
  acessorios: ['Higienização','Hidratação (couro)','Pintura (completa)','Pintura (detalhe)','Higienização interna','Customização (troca de cores)']
};

const PROMOCAO = {
  percentual: {2:10, 3:15, 4:20},
  minimoPacote: 5,
  valorPacote: 4999
};

const LOJA = {
  whatsapp: 'https://wa.me/5511926611910',
  instagram: 'https://www.instagram.com/washbrotherstatuape/',
  horarios: {1:[600,1110],2:[600,1110],3:[600,1110],4:[600,1110],5:[600,1110],6:[540,900]}
};
