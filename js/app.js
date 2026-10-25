/* Campus Lost & Found Portal - shared data layer (mock backend using localStorage) */

const Store = {
  _get(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  },
  _set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getUsers() { return this._get('clfp_users'); },
  saveUser(user) {
    const users = this.getUsers();
    users.push(user);
    this._set('clfp_users', users);
  },
  emailExists(email) {
    return this.getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
  },
  getItems() { return this._get('clfp_items'); },
  saveItem(item) {
    const items = this.getItems();
    item.id = 'ITM-' + Date.now();
    item.status = 'Active';
    items.push(item);
    this._set('clfp_items', items);
    return item;
  },
  updateItem(id, changes) {
    const items = this.getItems().map(it => it.id === id ? { ...it, ...changes } : it);
    this._set('clfp_items', items);
  },
  deleteItem(id) {
    const items = this.getItems().filter(it => it.id !== id);
    this._set('clfp_items', items);
  },
  getClaims() { return this._get('clfp_claims'); },
  saveClaim(claim) {
    const claims = this.getClaims();
    claim.id = 'CLM-' + Date.now();
    claim.status = 'Pending';
    claims.push(claim);
    this._set('clfp_claims', claims);
    return claim;
  },
  updateClaim(id, changes) {
    const claims = this.getClaims().map(c => c.id === id ? { ...c, ...changes } : c);
    this._set('clfp_claims', claims);
  },
};

function showMessage(el, text, type) {
  el.textContent = text;
  el.className = 'msg ' + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
