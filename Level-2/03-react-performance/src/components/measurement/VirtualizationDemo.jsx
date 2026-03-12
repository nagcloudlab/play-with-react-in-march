import { useState, useCallback } from 'react'

const ITEM_HEIGHT = 35
const NAIVE_COUNT = 500
const VIRTUAL_COUNT = 100000
const VISIBLE_COUNT = 20
const CONTAINER_HEIGHT = VISIBLE_COUNT * ITEM_HEIGHT

function NaiveList() {
  const items = []
  for (let i = 0; i < NAIVE_COUNT; i++) {
    items.push(
      <div key={i} className="border-bottom py-1 px-2" style={{ height: ITEM_HEIGHT, fontSize: '0.85rem' }}>
        Item {i + 1} — naive render
      </div>
    )
  }
  return (
    <div style={{ height: CONTAINER_HEIGHT, overflowY: 'auto' }}>
      {items}
    </div>
  )
}

function VirtualList() {
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT)
  const endIndex = Math.min(startIndex + VISIBLE_COUNT + 2, VIRTUAL_COUNT)
  const offsetY = startIndex * ITEM_HEIGHT
  const totalHeight = VIRTUAL_COUNT * ITEM_HEIGHT

  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const visibleItems = []
  for (let i = startIndex; i < endIndex; i++) {
    visibleItems.push(
      <div
        key={i}
        className="border-bottom py-1 px-2"
        style={{ height: ITEM_HEIGHT, fontSize: '0.85rem' }}
      >
        Item {i + 1} — virtualized
      </div>
    )
  }

  return (
    <div>
      <div
        style={{ height: CONTAINER_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ position: 'absolute', top: offsetY, left: 0, right: 0 }}>
            {visibleItems}
          </div>
        </div>
      </div>
      <p className="text-muted small mt-1 mb-0">
        Rendering items {startIndex + 1}–{endIndex} of {VIRTUAL_COUNT.toLocaleString()}
        {' '}({endIndex - startIndex} DOM nodes)
      </p>
    </div>
  )
}

export default function VirtualizationDemo() {
  return (
    <div>
      <h2>Virtualization</h2>
      <ul>
        <li>Rendering thousands of DOM nodes is expensive and causes jank.</li>
        <li>Virtualization only renders the items currently visible in the viewport.</li>
        <li>The naive list renders all {NAIVE_COUNT} items as real DOM nodes.</li>
        <li>The virtualized list handles {VIRTUAL_COUNT.toLocaleString()} items but only renders ~{VISIBLE_COUNT} DOM nodes.</li>
        <li>This is a manual implementation — no external library needed.</li>
      </ul>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card border-danger h-100">
            <div className="card-body">
              <h6 className="text-danger">Naive: {NAIVE_COUNT} DOM nodes</h6>
              <NaiveList />
              <p className="text-muted small mt-1 mb-0">
                All {NAIVE_COUNT} items are in the DOM at once.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card border-success h-100">
            <div className="card-body">
              <h6 className="text-success">Virtualized: {VIRTUAL_COUNT.toLocaleString()} items</h6>
              <VirtualList />
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0)
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + visibleCount, items.length)

  return (
    <div style={{ height: containerHeight, overflow: 'auto' }}
         onScroll={e => setScrollTop(e.currentTarget.scrollTop)}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: startIndex * itemHeight }}>
          {items.slice(startIndex, endIndex).map(renderItem)}
        </div>
      </div>
    </div>
  )
}`}</code>
    </div>
  )
}
