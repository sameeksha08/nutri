// src/components/village.js
// Village helper utilities
function villageStatusColor(status) {
  return status === 'online' ? '#44cc77' : status === 'busy' ? '#ffaa22' : '#bbb';
}
