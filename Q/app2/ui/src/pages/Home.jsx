export default function Home() {
  return (
    <>
      <h1>Client-Side Rendering with React + REST API</h1>

      <section className="card">
        <h2>What is CSR?</h2>
        <p>
          With <strong>Client-Side Rendering</strong>, the server sends a nearly empty HTML
          file plus a JavaScript bundle. The browser downloads and executes the JS, which
          builds the entire UI and fetches data from a REST API.
        </p>

        <h3>How this app works:</h3>
        <ol>
          <li>Browser loads <code>index.html</code> — just an empty <code>&lt;div id="root"&gt;</code></li>
          <li>Browser downloads and runs the React JS bundle</li>
          <li>React renders components into the DOM</li>
          <li>Components call <code>fetch('/api/products')</code> to get data</li>
          <li>While waiting, the user sees a <strong>loading spinner</strong></li>
          <li>Data arrives → React re-renders with actual content</li>
        </ol>
      </section>

      <section className="card">
        <h2>CSR vs SSR (app1)</h2>
        <table>
          <thead>
            <tr><th></th><th>This app (CSR)</th><th>app1 (SSR)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Initial HTML</strong></td>
              <td>Empty <code>&lt;div&gt;</code></td>
              <td>Full content</td>
            </tr>
            <tr>
              <td><strong>Data fetching</strong></td>
              <td>Browser calls REST API</td>
              <td>Server has data already</td>
            </tr>
            <tr>
              <td><strong>Navigation</strong></td>
              <td>Instant — no page reload</td>
              <td>Full page reload each click</td>
            </tr>
            <tr>
              <td><strong>Loading states</strong></td>
              <td>Spinners while fetching</td>
              <td>None — HTML arrives complete</td>
            </tr>
            <tr>
              <td><strong>View Page Source</strong></td>
              <td>Empty — just a script tag</td>
              <td>All content visible</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Try it</h2>
        <ol>
          <li>Right-click this page → <strong>View Page Source</strong></li>
          <li>Notice: just <code>&lt;div id="root"&gt;&lt;/div&gt;</code> and a <code>&lt;script&gt;</code></li>
          <li>Go to <strong>Products</strong> — watch the loading spinner appear</li>
          <li>Open DevTools → Network tab to see the <code>/api/products</code> fetch call</li>
        </ol>
      </section>
    </>
  );
}
