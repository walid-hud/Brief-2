export class ProxyStoreController  {
  unsubscribe;
  store;
  host;

  constructor(
    host,
    store
  ) {
    this.store = store
    this.host = host
    host.addController(this);
  }
  
  hostConnected() {
    this.unsubscribe = this.store.subscribe(() => {
      this.host.requestUpdate();  
    });
  }

  hostDisconnected() {
    this.unsubscribe?.();
  }
}

