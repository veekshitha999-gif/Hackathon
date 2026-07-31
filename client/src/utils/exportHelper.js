/**
 * Results Exporter: CSV Download & Printable PDF/HTML Report
 */

export function exportToCSV(quizTitle, rankings) {
  if (!rankings || !rankings.length) return;

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Rank,Nickname,Score,Streak,Role\n';

  rankings.forEach((r, idx) => {
    const role = r.isHost ? 'Host' : 'Player';
    csvContent += `${idx + 1},"${r.nickname.replace(/"/g, '""')}",${r.score},${r.streak || 0},${role}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${quizTitle.replace(/[^a-z0-9]/gi, '_')}_Results.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printSummaryReport(quizTitle, rankings) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const rows = rankings.map((r, i) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center; font-weight: bold;">#${i + 1}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${r.nickname} ${r.isHost ? '<span style="background:#8b5cf6;color:white;padding:2px 6px;border-radius:4px;font-size:11px;">Host</span>' : ''}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold; color: #8b5cf6;">${r.score.toLocaleString()} pts</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Quiz Results - ${quizTitle}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; }
          h1 { color: #6d28d9; margin-bottom: 5px; }
          .header { border-bottom: 2px solid #8b5cf6; padding-bottom: 15px; margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #f1f5f9; padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>⚡ Q-Clash Leaderboard Report</h1>
          <p><strong>Quiz:</strong> ${quizTitle} | <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 80px; text-align: center;">Rank</th>
              <th>Participant</th>
              <th style="text-align: right;">Total Score</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
}
