import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  User,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Users,
} from "lucide-react";

import seedRaw from "../data/familySeed.js";

/* ---------------------- constants ---------------------- */
const NAV_HEIGHT = 64;

const CFG_HORIZONTAL = {
  colW: 900,
  rowH: 125,
  boxW: 240,
  boxH: 70,
  margin: 40,
};

const CFG_VERTICAL = {
  colW: 400,
  rowH: 80,
  boxW: 200,
  boxH: 60,
  margin: 30,
};

/* ---------------------- helpers: data ---------------------- */
const slug = (s) =>
  (s || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function withIds(node, depth = 1, path = "root") {
  if (!node || typeof node !== "object") return null;
  const id = `${path}-${slug(node.name || "unknown")}`;
  const spouses = Array.isArray(node.spouses)
    ? node.spouses.map((s, i) => {
        if (typeof s === "string") {
          return { id: `${id}-sp${i + 1}`, name: s };
        } else if (typeof s === "object" && s !== null) {
          return { ...s, id: `${id}-sp${i + 1}` };
        }
        return null;
      }).filter(Boolean)
    : [];
  const children = Array.isArray(node.children)
    ? node.children
        .map((c, i) => withIds(c, depth + 1, `${id}-c${i + 1}`))
        .filter(Boolean)
    : [];
  return { ...node, id, generation: depth, spouses, children };
}

function dfs(n, fn) {
  if (!n) return;
  fn(n);
  (n.children || []).forEach((c) => dfs(c, fn));
}

function collectNodes(root) {
  const out = [];
  dfs(root, (n) => out.push(n));
  return out;
}

/* ---------------------- helpers: kinship ---------------------- */
function getOrdinalSuffix(num) {
  const teen = num % 100;
  if (teen >= 11 && teen <= 13) return "th";
  const digit = num % 10;
  return digit === 1 ? "st" : digit === 2 ? "nd" : digit === 3 ? "rd" : "th";
}

function getAncestorChain(id, parentById) {
  const chain = [];
  let cur = id;
  while (cur) {
    chain.unshift(cur);
    cur = parentById.get(cur);
  }
  return chain;
}

function findCommonAncestorFast(parentById, id1, id2) {
  const a1 = getAncestorChain(id1, parentById);
  const a2 = getAncestorChain(id2, parentById);
  let ca = null,
    idx = -1;
  for (let i = 0; i < Math.min(a1.length, a2.length); i++) {
    if (a1[i] === a2[i]) {
      ca = a1[i];
      idx = i;
    } else break;
  }
  if (!ca) return null;
  return {
    commonAncestor: ca,
    distance1: a1.length - idx - 1,
    distance2: a2.length - idx - 1,
  };
}

function calculateRelationship(id1, id2, nodeById, parentById, childrenById) {
  if (id1 === id2) return "Same person";
  const node1 = nodeById.get(id1);
  const node2 = nodeById.get(id2);
  if (!node1 || !node2) return "Unknown relationship";

  const c1 = childrenById.get(id1) || [];
  const c2 = childrenById.get(id2) || [];
  if (c1.includes(id2)) {
    const gender = node2.gender?.toLowerCase();
    return gender === "male" ? "Beta (Son)" : gender === "female" ? "Beti (Daughter)" : "Child";
  }
  if (c2.includes(id1)) {
    const gender = node1.gender?.toLowerCase();
    return gender === "male" ? "Papa/Dad (Father)" : gender === "female" ? "Mummy/Mom (Mother)" : "Parent";
  }

  const p1 = parentById.get(id1);
  const p2 = parentById.get(id2);
  if (p1 && p1 === p2) {
    const gender = node2.gender?.toLowerCase();
    return gender === "male" ? "Bhai (Brother)" : gender === "female" ? "Ben (Sister)" : "Sibling";
  }

  const gp1 = p1 ? parentById.get(p1) : null;
  const gp2 = p2 ? parentById.get(p2) : null;
  
  if (gp1 && gp1 === gp2) {
    const gender = node2.gender?.toLowerCase();
    const parentGender = nodeById.get(p2)?.gender?.toLowerCase();
    
    if (parentGender === "male") {
      return gender === "male" ? "Chachu (Uncle - Father's Brother)" : gender === "female" ? "Chachi (Aunt - Uncle's Wife)" : "Chachu/Chachi";
    } else if (parentGender === "female") {
      return gender === "male" ? "Mama (Uncle - Mother's Brother)" : gender === "female" ? "Mami (Aunt - Uncle's Wife)" : "Mama/Mami";
    }
    return "Uncle/Aunt";
  }

  if (p1 && p1 === parentById.get(id2)) {
    const gender = node2.gender?.toLowerCase();
    return gender === "male" ? "Beta (Son)" : gender === "female" ? "Beti (Daughter)" : "Child";
  }

  if (gp1 && gp1 === id2) {
    const gender = node2.gender?.toLowerCase();
    return gender === "male" ? "Dada (Grandfather)" : gender === "female" ? "Dadi (Grandmother)" : "Grandparent";
  }
  if (gp2 && gp2 === id1) {
    const gender = node1.gender?.toLowerCase();
    return gender === "male" ? "Beta (Grandson)" : gender === "female" ? "Beti (Granddaughter)" : "Grandchild";
  }

  const res = findCommonAncestorFast(parentById, id1, id2);
  if (!res) return "No known relationship";
  const { distance1, distance2 } = res;

  if (distance1 === 1 && distance2 === 2) {
    const gender = node2.gender?.toLowerCase();
    const parentGender = nodeById.get(p2)?.gender?.toLowerCase();
    if (parentGender === "male") {
      return gender === "male" ? "Bhatija (Nephew)" : gender === "female" ? "Bhatiji (Niece)" : "Bhatija/Bhatiji";
    }
    return gender === "male" ? "Bhatija (Nephew)" : gender === "female" ? "Bhatiji (Niece)" : "Bhatija/Bhatiji";
  }
  if (distance1 === 2 && distance2 === 1) {
    const gender = node1.gender?.toLowerCase();
    return gender === "male" ? "Kaka/Chachu (Uncle)" : gender === "female" ? "Kaki/Chachi (Aunt)" : "Uncle/Aunt";
  }

  if (distance1 === distance2 && distance1 >= 2) {
    const degree = distance1 - 1;
    if (degree === 1) {
      const gender = node2.gender?.toLowerCase();
      return gender === "male" ? "Cousin Bhai (Male Cousin)" : gender === "female" ? "Cousin Ben (Female Cousin)" : "Cousin";
    }
    return `${degree}${getOrdinalSuffix(degree)} Cousin`;
  }

  if (distance1 >= 2 && distance2 >= 2) {
    const minDist = Math.min(distance1, distance2);
    const removal = Math.abs(distance1 - distance2);
    const degree = minDist - 1;
    if (removal === 0) {
      const gender = node2.gender?.toLowerCase();
      return gender === "male" ? "Cousin Bhai" : gender === "female" ? "Cousin Ben" : "Cousin";
    }
    const removalText =
      removal === 1 ? "once removed" : `${removal} times removed`;
    return `${degree}${getOrdinalSuffix(degree)} cousin ${removalText}`;
  }

  return `${Math.min(distance1, distance2)} generation${
    Math.abs(distance1 - distance2) > 0
      ? ` (${Math.abs(distance1 - distance2)} removed)`
      : "s"
  } apart`;
}

/* ---------------------- helpers: layout ---------------------- */
function computeHeights(node) {
  if (!node.children || node.children.length === 0) {
    node._units = 1;
    return 1;
  }
  let sum = 0;
  for (const c of node.children) sum += computeHeights(c);
  node._units = Math.max(1, sum);
  return node._units;
}

function computeTidyLayout(node, depth, yTop, cfg) {
  const { colW, rowH, boxW } = cfg;

  if (!node.children || node.children.length === 0) {
    node.x = depth * colW + boxW / 2;
    node.y = yTop + rowH / 2;
    node._units = 1;
    return 1;
  }

  const childSpacing = Math.max(rowH, 70 + node.children.length * 8);
  let cursor = yTop;
  let totalHeight = 0;

  for (const child of node.children) {
    const childUnits = computeTidyLayout(child, depth + 1, cursor, cfg);
    const childBlock = childUnits * childSpacing;
    totalHeight += childBlock;
    cursor += childBlock;
  }

  const childrenYCenter = yTop + totalHeight / 2;
  node.x = depth * colW + boxW / 2;
  node.y = childrenYCenter;
  node._units = Math.max(1, Math.ceil(totalHeight / rowH));
  return node._units;
}

function computeChronologicalLayout(node, depth, yTop, cfg) {
  const { colW, rowH, boxW } = cfg;
  const blockH = node._units * rowH;
  node.x = depth * colW + boxW / 2;
  node.y = yTop + blockH / 2;
  let cursor = yTop;
  for (const c of node.children || []) {
    const h = c._units * rowH;
    computeChronologicalLayout(c, depth + 1, cursor, cfg);
    cursor += h;
  }
}

function orientXY(x, y, orientation) {
  return orientation === "vertical" ? { X: y, Y: x } : { X: x, Y: y };
}

/* ---------------------- Component ---------------------- */
export default function FamilyTree() {
  const seed = useMemo(() => withIds(seedRaw), []);
  const [orientation, setOrientation] = useState("horizontal");
  const cfg = useMemo(() => CFG_HORIZONTAL, []);

  const tree = useMemo(() => {
    if (!seed) return null;
    const r = JSON.parse(JSON.stringify(seed));
    computeHeights(r);
    computeChronologicalLayout(r, 0, 0, cfg);
    return r;
  }, [seed, cfg]);

  const nodes = useMemo(() => (tree ? collectNodes(tree) : []), [tree]);

  const { nodeById, parentById, childrenById } = useMemo(() => {
    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    const parentById = new Map();
    nodes.forEach((p) =>
      (p.children || []).forEach((c) => parentById.set(c.id, p.id))
    );
    const childrenById = new Map(
      nodes.map((n) => [n.id, (n.children || []).map((c) => c.id)])
    );
    return { nodeById, parentById, childrenById };
  }, [nodes]);

  const { contentWidth, contentHeight, minX, minY } = useMemo(() => {
    if (!tree || nodes.length === 0)
      return { contentWidth: 1200, contentHeight: 600, minX: 0, minY: 0 };

    const oriented = nodes.map((n) => {
      const { X, Y } = orientXY(n.x, n.y, orientation);
      return { X, Y };
    });

    const maxX = Math.max(...oriented.map((n) => n.X + cfg.boxW / 2));
    const maxY = Math.max(...oriented.map((n) => n.Y + cfg.boxH / 2));
    const minX = Math.min(...oriented.map((n) => n.X - cfg.boxW / 2));
    const minY = Math.min(...oriented.map((n) => n.Y - cfg.boxH / 2));
    return {
      contentWidth: maxX - minX + cfg.margin * 2,
      contentHeight: maxY - minY + cfg.margin * 2,
      minX,
      minY,
    };
  }, [tree, nodes, cfg, orientation]);

  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const scaleRef = useRef(scale);
  const txRef = useRef(tx);
  const tyRef = useRef(ty);
  useEffect(() => {
    scaleRef.current = scale;
    txRef.current = tx;
    tyRef.current = ty;
  }, [scale, tx, ty]);

  const DRAG_THRESHOLD = 5;
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    hasMoved: false,
    pointerId: null,
  });

  const pointers = useRef(new Map());

  const setPanBy = (dx, dy) => {
    setTx((prev) => prev + dx);
    setTy((prev) => prev + dy);
  };

  const handlePointerDown = useCallback((e) => {
    if (e.target.closest("g[data-node]")) return;
    const d = dragRef.current;
    d.isDown = true;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.hasMoved = false;
    d.pointerId = e.pointerId;
    pointers.current.set(e.pointerId, e);
  }, []);

  const handlePointerMove = useCallback((e) => {
    pointers.current.set(e.pointerId, e);
    const ptrs = pointers.current;

    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      const dx = b.clientX - a.clientX;
      const dy = b.clientY - a.clientY;
      const dist = Math.hypot(dx, dy);
      if (!ptrs.prevDist) ptrs.prevDist = dist;
      const factor = dist / ptrs.prevDist;

      const el = wrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = (a.clientX + b.clientX) / 2 - rect.left;
        const cy = (a.clientY + b.clientY) / 2 - rect.top;
        const oldScale = scaleRef.current;
        const newScale = Math.min(3, Math.max(0.1, oldScale * factor));
        const wx = (cx - txRef.current) / oldScale;
        const wy = (cy - tyRef.current) / oldScale;
        setScale(newScale);
        setTx(cx - wx * newScale);
        setTy(cy - wy * newScale);
      }

      ptrs.prevDist = dist;
      return;
    }

    const d = dragRef.current;
    if (!d.isDown || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const dist = Math.hypot(dx, dy);
    if (dist > DRAG_THRESHOLD) {
      if (!d.hasMoved) {
        wrapperRef.current?.setPointerCapture(e.pointerId);
        d.hasMoved = true;
      }
      setPanBy(dx, dy);
      d.startX = e.clientX;
      d.startY = e.clientY;
    }
  }, []);

  const handlePointerUp = useCallback((e) => {
    const d = dragRef.current;
    if (d.hasMoved) {
      wrapperRef.current?.releasePointerCapture(e.pointerId);
    }
    d.isDown = false;
    d.hasMoved = false;
    d.pointerId = null;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pointers.current.prevDist = null;
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const factor = Math.exp(-e.deltaY * 0.002);
      const oldScale = scaleRef.current;
      const newScale = Math.min(3, Math.max(0.1, oldScale * factor));

      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const wx = (cx - txRef.current) / oldScale;
      const wy = (cy - tyRef.current) / oldScale;

      setScale(newScale);
      setTx(cx - wx * newScale);
      setTy(cy - wy * newScale);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const animateTo = (targetX, targetY, targetScale = scale, duration = 600) => {
    const start = performance.now();
    const init = { x: txRef.current, y: tyRef.current, s: scaleRef.current };
    const loop = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setTx(init.x + (targetX - init.x) * e);
      setTy(init.y + (targetY - init.y) * e);
      setScale(init.s + (targetScale - init.s) * e);
      if (k < 1) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };

  const fit = useCallback(() => {
    const wrap = wrapperRef.current;
    if (!wrap || nodes.length === 0) return;

    const rect = wrap.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height - NAV_HEIGHT;

    const padding = 0.88;
    const sX = (vw * padding) / contentWidth;
    const sY = (vh * padding) / contentHeight;
    let newScale = Math.min(sX, sY);
    newScale = Math.max(0.1, Math.min(2.0, newScale));
    newScale = Math.round(newScale * 100) / 100;

    setScale(newScale);

    const scaledWidth = contentWidth * newScale;
    const scaledHeight = contentHeight * newScale;

    setTx((vw - scaledWidth) / 2);
    setTy((vh - scaledHeight) / 2 + NAV_HEIGHT);
  }, [contentWidth, contentHeight, nodes.length]);

  useLayoutEffect(() => {
    fit();
  }, [fit, orientation]);

  useEffect(() => {
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(3, s * 1.3)), []);
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(0.1, s / 1.3)),
    []
  );

  const [selected, setSelected] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [relationshipTarget, setRelationshipTarget] = useState(null);
  const [relationshipResult, setRelationshipResult] = useState("");
  const [isolatedIds, setIsolatedIds] = useState(null);

  const collectDescendantIds = useCallback(
    (rootId) => {
      const out = new Set();
      const stack = [rootId];
      while (stack.length) {
        const id = stack.pop();
        if (out.has(id)) continue;
        out.add(id);
        const kids = childrenById.get(id) || [];
        kids.forEach((k) => stack.push(k));
      }
      return out;
    },
    [childrenById]
  );

  const collectAncestorChainIds = useCallback(
    (leafId) => {
      const out = new Set();
      let cur = leafId;
      while (cur) {
        out.add(cur);
        cur = parentById.get(cur);
      }
      return out;
    },
    [parentById]
  );

  const isolateFamily = useCallback(
    (person) => {
      if (!person) return;
      const a = collectAncestorChainIds(person.id);
      const d = collectDescendantIds(person.id);
      const union = new Set([...a, ...d]);
      setIsolatedIds(union);
    },
    [collectAncestorChainIds, collectDescendantIds]
  );

  const returnToFullTree = useCallback(() => setIsolatedIds(null), []);

  const isolatedTree = useMemo(() => {
    if (!isolatedIds || !tree) return null;
    
    const isolatedArray = Array.from(isolatedIds);
    let root = null;
    for (const id of isolatedArray) {
      let cur = id;
      let depth = 0;
      while (parentById.get(cur) && isolatedIds.has(parentById.get(cur))) {
        cur = parentById.get(cur);
        depth++;
      }
      if (!root || depth > (root.depth || 0)) {
        root = { id: cur, depth };
      }
    }
    
    if (!root) return null;
    
    const clone = (node) => {
      if (!node || !isolatedIds.has(node.id)) return null;
      const kids = (node.children || [])
        .map(c => clone(c))
        .filter(Boolean);
      return { ...node, children: kids };
    };
    
    return clone(nodeById.get(root.id));
  }, [isolatedIds, tree, nodeById, parentById]);

  const renderTree = useMemo(() => {
    return isolatedIds && isolatedTree ? isolatedTree : tree;
  }, [isolatedIds, isolatedTree, tree]);

  const renderNodes = useMemo(() => {
    return renderTree ? collectNodes(renderTree) : [];
  }, [renderTree]);

  const norm = (s) => (s || "").toLowerCase().trim();
  const matches = (n, q) =>
    norm(n.name).includes(q) ||
    norm(n.notes || "").includes(q) ||
    (n.spouses || []).some((s) => norm(s.name).includes(q));

  const matchedNodes = useMemo(() => {
    const q = norm(searchQuery);
    if (!q) return new Set();
    return new Set(renderNodes.filter((n) => matches(n, q)).map((n) => n.id));
  }, [renderNodes, searchQuery]);

  const findPathToNode = useCallback((root, targetId, path = []) => {
    if (!root) return null;
    const current = [...path, root.id];
    if (root.id === targetId) return current;
    for (const c of root.children || []) {
      const p = findPathToNode(c, targetId, current);
      if (p) return p;
    }
    return null;
  }, []);

  const highlightedPaths = useMemo(() => {
    if (!searchQuery.trim() || matchedNodes.size === 0) return new Set();
    const pathNodes = new Set();
    matchedNodes.forEach((nodeId) => {
      const path = findPathToNode(tree, nodeId);
      if (path) path.forEach((id) => pathNodes.add(id));
    });
    return pathNodes;
  }, [tree, matchedNodes, findPathToNode, searchQuery]);

  const breadcrumbs = useMemo(() => {
    if (!selected || !tree) return [];
    const path = findPathToNode(tree, selected.id);
    return (path || []).map((id) => nodeById.get(id)).filter(Boolean);
  }, [selected, tree, findPathToNode, nodeById]);

  const centerOnNode = useCallback(
    (node, targetScale = 1.2) => {
      if (!wrapperRef.current || !node) return;
      const wrap = wrapperRef.current;
      const rect = wrap.getBoundingClientRect();
      const vw = rect.width;
      const vh = rect.height - NAV_HEIGHT;

      const { X, Y } = orientXY(node.x, node.y, orientation);
      const nodeX = X - minX + cfg.margin;
      const nodeY = Y - minY + cfg.margin;

      const targetTx = vw / 2 - targetScale * nodeX;
      const targetTy = (vh + NAV_HEIGHT) / 2 - targetScale * nodeY;
      animateTo(targetTx, targetTy, targetScale, 500);
    },
    [cfg.margin, minX, minY, orientation]
  );

  const handleNodeClick = useCallback(
    (node, e) => {
      e.stopPropagation();
      if (dragRef.current.hasMoved) return;

      if (relationshipTarget && relationshipTarget.id !== node.id) {
        const rel = calculateRelationship(
          relationshipTarget.id,
          node.id,
          nodeById,
          parentById,
          childrenById
        );
        setRelationshipResult(
          `${relationshipTarget.name} and ${node.name} are: ${rel}`
        );
        setRelationshipTarget(null);
      } else {
        setSelected(node);
        setRelationshipResult("");
        if (!node.id.includes("-sp")) {
          centerOnNode(node);
        }
      }
    },
    [relationshipTarget, nodeById, parentById, childrenById, centerOnNode]
  );

  const findParent = useCallback(
    (id) => {
      const pid = parentById.get(id);
      return pid ? nodeById.get(pid) : null;
    },
    [parentById, nodeById]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (!selected) return;

      const parent = findParent(selected.id);
      const firstChild = selected.children?.[0];
      let newSel = null;

      switch (e.key) {
        case "ArrowLeft":
          if (parent) newSel = parent;
          break;
        case "ArrowRight":
          if (firstChild) newSel = firstChild;
          break;
        case "ArrowUp": {
          if (!parent) break;
          const list = parent.children || [];
          const idx = list.findIndex((c) => c.id === selected.id);
          const next = list[idx - 1];
          if (next) newSel = next;
          break;
        }
        case "ArrowDown": {
          if (!parent) break;
          const list = parent.children || [];
          const idx = list.findIndex((c) => c.id === selected.id);
          const next = list[idx + 1];
          if (next) newSel = next;
          break;
        }
        case "Home": {
          if (!parent) break;
          const first = (parent.children || [])[0];
          if (first) newSel = first;
          break;
        }
        case "End": {
          if (!parent) break;
          const list = parent.children || [];
          const last = list[list.length - 1];
          if (last) newSel = last;
          break;
        }
        case "Enter":
          centerOnNode(selected);
          break;
        case "Escape":
          setSelected(null);
          setRelationshipTarget(null);
          setRelationshipResult("");
          break;
        default:
          return;
      }

      if (newSel) {
        e.preventDefault();
        setSelected(newSel);
        centerOnNode(newSel);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, centerOnNode, findParent]);

  if (!tree) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-xl">Loading family tree...</div>
      </div>
    );
  }

  const pathSet = highlightedPaths;
  const matchSet = matchedNodes;
  const showAll = matchSet.size === 0;

  // Calculate spouse connector lines
  const spouseLinks = useMemo(() => {
    const links = [];
    renderNodes.forEach((node) => {
      if (!node.spouses || node.spouses.length === 0) return;
      
      const o = orientXY(node.x, node.y, orientation);
      const nodeX = o.X - minX + cfg.margin;
      const nodeY = o.Y - minY + cfg.margin;
      
      const spouseCount = node.spouses.length;
      const spouseSpacing = 150;
      const spouseBaseOffset = cfg.boxW / 2 + spouseSpacing;
      
      node.spouses.forEach((spouse, i) => {
        const spouseOffset = spouseBaseOffset + (i - (spouseCount - 1) / 2) * (cfg.boxW + spouseSpacing);
        const x1 = nodeX + cfg.boxW / 2;
        const y1 = nodeY;
        const x2 = nodeX + spouseOffset - cfg.boxW / 2;
        const y2 = nodeY;
        links.push({ x1, y1, x2, y2 });
      });
    });
    return links;
  }, [renderNodes, minX, minY, cfg, orientation]);

  return (
    <div
      className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden"
      style={{ overscrollBehavior: "none" }}
    >
      {/* Search */}
      <div className="fixed left-6 z-50" style={{ top: `${NAV_HEIGHT + 20}px` }}>
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-80"
          style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search family members..."
              className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base w-full font-medium"
            />
          </div>
          {searchQuery && (
            <div className="text-sm text-gray-600">
              {matchSet.size} result{matchSet.size !== 1 ? "s" : ""} found
              {matchSet.size > 0 && (
                <span className="ml-2 text-blue-600">● Path highlighted</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="fixed left-6 z-50" style={{ top: `${NAV_HEIGHT + 140}px` }}>
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 max-w-80">
            <div className="flex items-center gap-1 text-sm overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.id}>
                  <button
                    onClick={() => {
                      setSelected(crumb);
                      centerOnNode(crumb);
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
                  >
                    {crumb.name}
                  </button>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className="fixed right-6 z-50 flex flex-col gap-3"
        style={{ top: `${NAV_HEIGHT + 20}px` }}
      >
        <button
          onClick={zoomIn}
          className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all shadow-md"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all shadow-md"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={fit}
          className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all shadow-md"
          title="Fit to Screen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setOrientation((o) =>
              o === "horizontal" ? "vertical" : "horizontal"
            )
          }
          className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg bg-white hover:bg-gray-50"
          title="Switch Orientation (Horizontal / Vertical)"
        >
          {orientation === "horizontal" ? (
            <ToggleRight className="w-5 h-5" />
          ) : (
            <ToggleLeft className="w-5 h-5" />
          )}
        </button>
        {isolatedIds && (
          <button
            onClick={returnToFullTree}
            className="w-12 h-12 bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:bg-red-100"
            title="Return to Full Tree"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={wrapperRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none", overscrollBehavior: "none" }}
      >
        <svg width="100%" height="100%" className="block">
          <defs>
            <filter
              id="floating"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy={2 * scale}
                stdDeviation={3 * scale}
                floodOpacity="0.15"
              />
            </filter>
            <filter
              id="selectedGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy={4 * scale}
                stdDeviation={8 * scale}
                floodOpacity="0.25"
                floodColor="#3b82f6"
              />
            </filter>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.03)" />
            </pattern>
            <linearGradient id="spouseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bcbcbc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
            <rect
              width={contentWidth}
              height={contentHeight}
              fill="url(#grid)"
            />

            {/* Spouse connector lines */}
            <g className="spouse-links" style={{ pointerEvents: 'none' }}>
              {spouseLinks.map(({ x1, y1, x2, y2 }, i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#c7c7c7"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  opacity={0.8}
                />
              ))}
            </g>

            {/* Nodes */}
            {renderNodes.map((node) => {
              const o = orientXY(node.x, node.y, orientation);
              const x = o.X - minX + cfg.margin;
              const y = o.Y - minY + cfg.margin;
              // Highlight if node or any spouse matches search
              const isMatched =
                matchSet.has(node.id) ||
                (node.spouses || []).some((sp) => matchSet.has(sp.id));
              // Hover if node or any spouse is hovered
              const isHovered =
                hoveredNode === node.id ||
                (node.spouses || []).some((sp) => hoveredNode === sp.id);
              const inPath = pathSet.has(node.id);
              const isSelected = selected?.id === node.id;
              const highlighted = showAll || isMatched || inPath;
              const isRelTarget = relationshipTarget?.id === node.id;

              const spouseCount = (node.spouses || []).length;
              const spouseSpacing = 150;
              const spouseBaseOffset = cfg.boxW / 2 + spouseSpacing;
              const spouseOffsets = Array.from({ length: spouseCount }, (_, i) => {
                const mid = (spouseCount - 1) / 2;
                return spouseBaseOffset + (i - mid) * (cfg.boxW + spouseSpacing);
              });

              return (
                <g
                  key={node.id}
                  data-node="true"
                  transform={`translate(${x} ${y})`}
                  className="cursor-pointer transition-all duration-300"
                  opacity={highlighted ? 1 : 0.3}
                  onClick={(e) => handleNodeClick(node, e)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  filter={isSelected ? "url(#selectedGlow)" : "url(#floating)"}
                >
                  <rect
                    x={-cfg.boxW / 2}
                    y={-cfg.boxH / 2}
                    width={cfg.boxW}
                    height={cfg.boxH}
                    rx="12"
                    fill={
                      isRelTarget
                        ? "#fef3c7"
                        : isMatched
                        ? "#dbeafe"
                        : inPath
                        ? "#e0f2fe"
                        : isSelected
                        ? "#eff6ff"
                        : isHovered
                        ? "#f9fafb"
                        : "#ffffff"
                    }
                    stroke={
                      isRelTarget
                        ? "#f59e0b"
                        : isMatched
                        ? "#3b82f6"
                        : inPath
                        ? "#0ea5e9"
                        : isSelected
                        ? "#2563eb"
                        : isHovered
                        ? "#6b7280"
                        : "#e5e7eb"
                    }
                    strokeWidth={
                      isMatched || inPath || isSelected || isRelTarget
                        ? 2.5
                        : 1.5
                    }
                    className="transition-all duration-300"
                  />

                  <text
                    y="-8"
                    textAnchor="middle"
                    fontSize={14}
                    className="font-semibold fill-gray-900 pointer-events-none"
                  >
                    {node.name}
                  </text>

                  {(node.spouses || []).map((sp, i) => {
                    const spouseIsSelected = selected?.id === sp.id;
                    return (
                      <g
                        key={sp.id}
                        transform={`translate(${spouseOffsets[i]} 0)`}
                        onClick={(e) => handleNodeClick(sp, e)}
                        className="cursor-pointer"
                        filter={spouseIsSelected ? "url(#selectedGlow)" : "url(#floating)"}
                      >
                        <rect
                          x={-cfg.boxW / 2}
                          y={-cfg.boxH / 2}
                          width={cfg.boxW}
                          height={cfg.boxH}
                          rx="12"
                          fill="#fff"
                          stroke={spouseIsSelected ? "#2563eb" : "#d1d5db"}
                          strokeWidth={spouseIsSelected ? 2.5 : 1.5}
                        />
                        <text
                          y="-4"
                          textAnchor="middle"
                          fontSize={13}
                          className="font-semibold fill-gray-900"
                        >
                          {sp.name}
                        </text>
                        {sp.notes && (
                          <text
                            y="12"
                            textAnchor="middle"
                            fontSize={11}
                            className="fill-gray-500"
                          >
                            {sp.notes}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {node.notes && (
                    <text
                      y="22"
                      textAnchor="middle"
                      fontSize={11}
                      className="fill-gray-500 pointer-events-none"
                    >
                      {node.notes.substring(0, 20)}
                      {node.notes.length > 20 ? "..." : ""}
                    </text>
                  )}

                  {isMatched && (
                    <circle
                      cx={-cfg.boxW / 2 + 15}
                      cy={-cfg.boxH / 2 + 15}
                      r="6"
                      fill="#3b82f6"
                      className="pointer-events-none"
                    />
                  )}

                  {inPath && !isMatched && (
                    <circle
                      cx={cfg.boxW / 2 - 15}
                      cy={-cfg.boxH / 2 + 15}
                      r="4"
                      fill="#0ea5e9"
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Edges */}
            {renderNodes.flatMap((parent) => {
              if (!parent.children?.length) return [];
              
              const spouseCount = (parent.spouses || []).length;
              const spouseSpacing = 150;
              const spouseBaseOffset = cfg.boxW / 2 + spouseSpacing;
              const spouseOffsets = Array.from({ length: spouseCount }, (_, i) => {
                const mid = (spouseCount - 1) / 2;
                return spouseBaseOffset + (i - mid) * (cfg.boxW + spouseSpacing);
              });

              let parentAnchorX = null;
              if (spouseCount > 0) {
                const o = orientXY(parent.x, parent.y, orientation);
                const x = o.X - minX + cfg.margin;
                parentAnchorX = x + spouseOffsets[spouseCount - 1] + cfg.boxW / 2;
              }

              return parent.children.map((child) => {
                const pXY = orientXY(parent.x, parent.y, orientation);
                const cXY = orientXY(child.x, child.y, orientation);

                const px = parentAnchorX !== null
                  ? parentAnchorX
                  : pXY.X - minX + cfg.margin + cfg.boxW / 2;
                const py = pXY.Y - minY + cfg.margin;
                const cx = cXY.X - minX + cfg.margin - cfg.boxW / 2;
                const cy = cXY.Y - minY + cfg.margin;
                const mx = px + (cfg.colW / 3);

                const inPath =
                  pathSet.has(parent.id) && pathSet.has(child.id);
                const highlighted =
                  showAll ||
                  inPath ||
                  matchSet.has(parent.id) ||
                  matchSet.has(child.id);

                return (
                  <path
                    key={`${parent.id}-${child.id}`}
                    d={`M ${px} ${py} H ${mx} V ${cy} H ${cx}`}
                    stroke={inPath ? "#3b82f6" : highlighted ? "#6b7280" : "#d1d5db"}
                    strokeWidth={inPath ? 3 : 2}
                    fill="none"
                    opacity={highlighted ? 1 : 0.4}
                    className="transition-all duration-300"
                  />
                );
              });
            })}
          </g>
        </svg>
      </div>

      {/* Side Panel */}
      {selected && (
        <div
          className="fixed right-6 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-y-auto"
          style={{
            top: `${NAV_HEIGHT + 20}px`,
            maxHeight: "calc(100vh - 140px)",
          }}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900">
                  {selected.name}
                </h2>

                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  {selected.dob && (
                    <p>
                      <span className="font-semibold text-gray-900">
                        Born:
                      </span>{" "}
                      {selected.dob}
                      {selected.gender && (
                        <span className="text-gray-500 ml-1">
                          ({selected.gender[0].toUpperCase()})
                        </span>
                      )}
                    </p>
                  )}
                  {selected.focus && (
                    <p>
                      <span className="font-semibold text-gray-900">
                        Focus:
                      </span>{" "}
                      {selected.focus}
                    </p>
                  )}
                  {selected.location && (
                    <p>
                      <span className="font-semibold text-gray-900">
                        Location:
                      </span>{" "}
                      {selected.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Bio */}
            {selected.bio && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Bio
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {selected.bio}
                </p>
              </div>
            )}

            {[selected.tile1, selected.tile2, selected.tile3].map((tile, i) => {
              if (!tile || !tile.content) return null;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {tile.title || `Tile ${i + 1}`}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {tile.content}
                  </p>
                </div>
              );
            })}

            {selected.website && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Website
                </h3>
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 hover:underline break-words"
                >
                  {selected.website}
                </a>
              </div>
            )}

            {/* Parents */}
            {(() => {
              // Show both parents (main parent and their spouses)
              const pid = parentById.get(selected.id);
              const parent = pid ? nodeById.get(pid) : null;
              if (!parent) return null;
              const parentSpouses = parent.spouses || [];
              return (
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Parents
                  </h3>
                  <div className="flex flex-col gap-2 items-start">
                    <button
                      onClick={() => {
                        setSelected(parent);
                        centerOnNode(parent);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium text-left"
                    >
                      {parent.name}
                    </button>
                    {parentSpouses.map((sp, i) => (
                      <button
                        key={sp.id || sp.name || i}
                        onClick={() => {
                          setSelected(sp);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium text-left"
                      >
                        {typeof sp === "string" ? sp : sp.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Siblings */}
            {(() => {
              const pid = parentById.get(selected.id);
              if (!pid) return null;
              const list = (childrenById.get(pid) || [])
                .filter((id) => id !== selected.id)
                .map((id) => nodeById.get(id));
              if (list.length === 0) return null;
              return (
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Siblings ({list.length})
                  </h3>
                  <div className="space-y-2 max-h-28 overflow-y-auto">
                    {list.map((sib) => (
                      <button
                        key={sib.id}
                        onClick={() => {
                          setSelected(sib);
                          centerOnNode(sib);
                        }}
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline text-left"
                      >
                        {sib.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Spouse Tile */}
            {selected.spouses && selected.spouses.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Spouse{selected.spouses.length > 1 ? "s" : ""}
                </h3>
                <div className="space-y-2">
                  {selected.spouses.map((sp, i) => {
                    const spouseName = typeof sp === "string" ? sp : sp.name;
                    const spouseGender = typeof sp === "object" && sp.gender ? sp.gender : null;
                    const spouseBio = typeof sp === "object" && sp.bio ? sp.bio : null;
                    return (
                      <div key={sp.id || spouseName || i} className="flex flex-col">
                        <button
                          onClick={() => {
                            setSelected(sp);
                          }}
                          className="block text-sm text-blue-600 hover:text-blue-800 hover:underline text-left"
                          style={{ cursor: "pointer" }}
                        >
                          {spouseName}
                          {spouseGender && (
                            <span className="ml-2 text-gray-500">({spouseGender})</span>
                          )}
                        </button>
                        {spouseBio && (
                          <span className="text-xs text-gray-500 mt-1">{spouseBio}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spouse tab for spouse nodes */}
            {selected.id.includes("-sp") && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Spouse</h3>
                <button
                  onClick={() => {
                    const mainPersonId = selected.id.split("-sp")[0];
                    const mainPerson = nodeById.get(mainPersonId);
                    if (mainPerson) {
                      setSelected(mainPerson);
                      centerOnNode(mainPerson);
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {nodeById.get(selected.id.split("-sp")[0])?.name || "Unknown"}
                </button>
              </div>
            )}

            {/* Generation (hide for spouse nodes) */}
            {!selected.id.includes("-sp") && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Generation
                  </h3>
                </div>
                <p className="text-sm text-gray-700">
                  Generation {selected.generation}
                </p>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <button
                onClick={() => {
                  if (relationshipTarget?.id === selected.id) {
                    setRelationshipTarget(null);
                    setRelationshipResult("");
                  } else {
                    setRelationshipTarget(selected);
                    setRelationshipResult("");
                  }
                }}
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  relationshipTarget?.id === selected.id
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                {relationshipTarget?.id === selected.id
                  ? "Click another person to see relationship"
                  : "Calculate relationship..."}
              </button>

              {relationshipResult && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800 font-medium">
                    {relationshipResult}
                  </p>
                </div>
              )}
            </div>

            {/* Isolate Tree Button (hide for spouse nodes) */}
            {!isolatedIds && !selected.id.includes("-sp") && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <button
                  onClick={() => isolateFamily(selected)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all border border-indigo-300"
                >
                  Isolate Family Tree
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}