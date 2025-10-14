// Build-time stubs for "three/webgpu" so Vite/Rollup find the named exports
// referenced by react-globe.gl / three-globe. These do nothing at runtime.

export class StorageInstancedBufferAttribute {
  constructor(array = [], itemSize = 1, normalized = false) {
    this.array = array;
    this.itemSize = itemSize;
    this.normalized = normalized;
  }
}

export class WebGPURenderer {
  constructor(params = {}) {
    this.params = params;
    this.domElement =
      typeof document !== "undefined"
        ? document.createElement("canvas")
        : { getContext: () => null };
  }
  getContext() { return null; }
  render() {}
  setSize() {}
  dispose() {}
}

// Allow wildcard/default imports if any consumer does that pattern
export default {};
