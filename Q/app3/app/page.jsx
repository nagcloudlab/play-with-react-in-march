export default function Home() {
  return (
    <>
      <h1>Next.js — Best of Both Worlds</h1>

      <section className="card">
        <h2>What Next.js does differently</h2>
        <p>
          Next.js combines <strong>server-side rendering</strong> (like app1) with
          <strong> client-side interactivity</strong> (like app2). You get:
        </p>
        <ul>
          <li>Full HTML from the server — great for SEO and fast first paint</li>
          <li>React hydrates on the client — instant navigation after load</li>
          <li>No separate REST API needed — data fetching happens in server components</li>
          <li>No loading spinners for initial page load — content arrives ready</li>
        </ul>
      </section>

      <section className="card">
        <h2>Three approaches compared</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>app1 — Express SSR</th>
              <th>app2 — React CSR</th>
              <th>app3 — Next.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Rendering</strong></td>
              <td>Server only</td>
              <td>Client only</td>
              <td>Server + Client</td>
            </tr>
            <tr>
              <td><strong>View Source</strong></td>
              <td>Full HTML</td>
              <td>Empty div</td>
              <td>Full HTML</td>
            </tr>
            <tr>
              <td><strong>Navigation</strong></td>
              <td>Full page reload</td>
              <td>Instant (SPA)</td>
              <td>Instant (client router)</td>
            </tr>
            <tr>
              <td><strong>Data fetching</strong></td>
              <td>Server has data</td>
              <td>Browser calls API</td>
              <td>Server component — async/await</td>
            </tr>
            <tr>
              <td><strong>Loading states</strong></td>
              <td>None</td>
              <td>Spinners everywhere</td>
              <td>None (or streaming)</td>
            </tr>
            <tr>
              <td><strong>SEO</strong></td>
              <td>Excellent</td>
              <td>Poor</td>
              <td>Excellent</td>
            </tr>
            <tr>
              <td><strong>Interactivity</strong></td>
              <td>None (plain HTML)</td>
              <td>Full React</td>
              <td>Full React (after hydration)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Key concepts in this app</h2>
        <ol>
          <li>
            <strong>Server Components</strong> (default) — run on the server, can use{' '}
            <code>async/await</code> directly, never ship JS to the browser
          </li>
          <li>
            <strong>Client Components</strong> (<code>&quot;use client&quot;</code>) — run on both server
            and client, needed for interactivity (useState, onClick, etc.)
          </li>
          <li>
            <strong>App Router</strong> — file-system routing via the <code>app/</code> directory
          </li>
          <li>
            <strong>Link component</strong> — client-side navigation without full page reloads
          </li>
        </ol>
      </section>

      <section className="card">
        <h2>Try it</h2>
        <ol>
          <li>View Page Source — you&apos;ll see full HTML (like app1, unlike app2)</li>
          <li>Click Products — navigation is instant (like app2, unlike app1)</li>
          <li>No loading spinner — data was fetched on the server before HTML was sent</li>
          <li>Check the product detail page timestamps — rendered fresh on each request</li>
        </ol>
      </section>
    </>
  );
}
