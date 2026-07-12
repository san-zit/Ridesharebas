import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import "../style/report.css";

export default function Report() {
  const [trips, setTrips] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [distanceMode, setDistanceMode] = useState("business");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, earningRes, expenseRes] = await Promise.all([
          api.get("/trips"),
          api.get("/earnings"),
          api.get("/expenses"),
        ]);

        setTrips(tripRes.data || []);
        setEarnings(earningRes.data || []);
        setExpenses(expenseRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const matchesDateRange = (value, start, end) => {
    const itemDate = new Date(value);
    if (Number.isNaN(itemDate.getTime())) return false;

    if (start) {
      const from = new Date(start);
      if (itemDate < from) return false;
    }

    if (end) {
      const to = new Date(end);
      to.setHours(23, 59, 59, 999);
      if (itemDate > to) return false;
    }

    return true;
  };

  const filteredTrips = useMemo(() => {
    if (!startDate && !endDate) return trips;
    return trips.filter((trip) =>
      matchesDateRange(trip.date, startDate, endDate),
    );
  }, [trips, startDate, endDate]);

  const filteredEarnings = useMemo(() => {
    if (!startDate && !endDate) return earnings;
    return earnings.filter((item) =>
      matchesDateRange(item.dateFrom || item.date || 0, startDate, endDate),
    );
  }, [earnings, startDate, endDate]);

  const filteredExpenses = useMemo(() => {
    if (!startDate && !endDate) return expenses;
    return expenses.filter((item) =>
      matchesDateRange(item.date || 0, startDate, endDate),
    );
  }, [expenses, startDate, endDate]);

  const report = useMemo(() => {
    const totalDistance = filteredTrips.reduce(
      (sum, trip) =>
        sum + (Number(trip.endkm || 0) - Number(trip.startkm || 0)),
      0,
    );
    const displayedDistance =
      distanceMode === "private"
        ? Math.round(totalDistance * 0.2)
        : totalDistance;
    const totalEarnings = filteredEarnings.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );
    const totalExpenses = filteredExpenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );
    const net = totalEarnings - totalExpenses;

    const earningsByType = filteredEarnings.reduce((acc, item) => {
      const key = item.earningsType || "Other";
      acc[key] = (acc[key] || 0) + Number(item.amount || 0);
      return acc;
    }, {});

    const expensesByType = filteredExpenses.reduce((acc, item) => {
      const key = item.expensesType || "Other";
      acc[key] = (acc[key] || 0) + Number(item.amount || 0);
      return acc;
    }, {});

    const monthlySummary = filteredEarnings
      .concat(filteredExpenses)
      .reduce((acc, item) => {
        const dateKey = (item.dateFrom || item.date || "").slice(0, 7);
        if (!dateKey) return acc;
        acc[dateKey] = acc[dateKey] || { income: 0, expenses: 0 };
        if (item.earningsType) acc[dateKey].income += Number(item.amount || 0);
        else acc[dateKey].expenses += Number(item.amount || 0);
        return acc;
      }, {});

    return {
      totalDistance,
      displayedDistance,
      totalEarnings,
      totalExpenses,
      net,
      earningsByType,
      expensesByType,
      monthlySummary,
    };
  }, [filteredTrips, filteredEarnings, filteredExpenses, distanceMode]);

  const formatCurrency = (value) =>
    `$${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setDistanceMode("business");
  };

  const escapePdfText = (value) =>
    String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");

  const buildSimplePdf = (text) => {
    const lines = String(text).split("\n");
    const contentLines = lines
      .map((line, index) => {
        const y = 760 - index * 14;
        return `BT /F1 12 Tf 50 ${y} Td (${escapePdfText(line)}) Tj ET`;
      })
      .join("\n");

    const contentStream = `<< /Length ${new Blob([contentLines]).size} >>\nstream\n${contentLines}\nendstream`;
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
      contentStream,
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [];

    objects.forEach((obj, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
    });

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach((offset) => {
      pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });

    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return pdf;
  };

  const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    const recentActivity = [...filteredEarnings, ...filteredExpenses]
      .sort(
        (a, b) =>
          new Date(b.dateFrom || b.date || 0) -
          new Date(a.dateFrom || a.date || 0),
      )
      .slice(0, 10)
      .map(
        (item) =>
          `${formatDate(item.dateFrom || item.date || "")}|${item.expensesType || item.earningsType || ""}|${formatCurrency(item.amount)}|${item.comments || ""}`,
      )
      .join("\n");

    const content = `Business Report\nGenerated: ${new Date().toLocaleString()}\n\nSummary\nTrips: ${filteredTrips.length}\nDistance: ${report.displayedDistance} km\nIncome: ${report.totalEarnings}\nExpenses: ${report.totalExpenses}\nNet: ${report.net}\n\nIncome by Type\n${Object.entries(
      report.earningsByType,
    )
      .map(([name, amount]) => `${name}: ${amount}`)
      .join("\n")}\n\nExpenses by Type\n${Object.entries(report.expensesByType)
      .map(([name, amount]) => `${name}: ${amount}`)
      .join("\n")}\n\nRecent Activity\n${recentActivity}`;

    downloadFile(
      buildSimplePdf(content),
      "business-report.pdf",
      "application/pdf",
    );
  };

  const handleExportExcel = () => {
    const rows = [
      ["Business Report"],
      ["Generated", new Date().toLocaleString()],
      [],
      ["Summary"],
      ["Trips", filteredTrips.length],
      ["Distance", `${report.displayedDistance} km`],
      ["Income", report.totalEarnings],
      ["Expenses", report.totalExpenses],
      ["Net", report.net],
      [],
      ["Income by Type"],
      ...Object.entries(report.earningsByType),
      [],
      ["Expenses by Type"],
      ...Object.entries(report.expensesByType),
      [],
      ["Recent Activity"],
      ["Date", "Type", "Amount", "Notes"],
      ...[...filteredEarnings, ...filteredExpenses]
        .sort(
          (a, b) =>
            new Date(b.dateFrom || b.date || 0) -
            new Date(a.dateFrom || a.date || 0),
        )
        .slice(0, 10)
        .map((item) => [
          formatDate(item.dateFrom || item.date || ""),
          item.expensesType || item.earningsType || "",
          item.amount,
          item.comments || "",
        ]),
    ];

    const csvContent = `\uFEFF${rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n")}`;

    downloadFile(csvContent, "business-report.csv", "text/csv;charset=utf-8;");
  };

  return (
    <div className="report-page">
      <div className="report-shell">
        <div className="report-hero">
          <h1>Business Report</h1>
          <p>Overview of your trips, income, and expenses in one place.</p>
          <div className="filter-row">
            <label>
              From
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              To
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              Distance Mode
              <select
                value={distanceMode}
                onChange={(e) => setDistanceMode(e.target.value)}
              >
                <option value="business">Business</option>
                <option value="private">Private</option>
              </select>
            </label>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={resetFilters}
              aria-label="Reset filters"
              title="Reset filters"
            >
              ↺
            </button>
          </div>
          <div className="report-actions">
            <button
              type="button"
              className="action-btn secondary"
              onClick={handlePrint}
            >
              Print
            </button>
            <button
              type="button"
              className="action-btn secondary"
              onClick={handleExportPdf}
            >
              Export PDF
            </button>
            <button
              type="button"
              className="action-btn primary"
              onClick={handleExportExcel}
            >
              Export Excel
            </button>
          </div>
        </div>

        {loading ? (
          <div className="summary-card">
            <span className="label">Loading report...</span>
          </div>
        ) : (
          <>
            <div className="summary-grid">
              <div className="summary-card">
                <span className="label">Trips</span>
                <span className="value">{trips.length}</span>
                <span className="subtext">Total recorded trips</span>
              </div>
              <div className="summary-card">
                <span className="label">Distance</span>
                <span className="value">{report.displayedDistance} km</span>
                <span className="subtext">
                  {distanceMode === "business"
                    ? "Business-use distance"
                    : "Private-use distance"}
                </span>
              </div>
              <div className="summary-card positive">
                <span className="label">Income</span>
                <span className="value">
                  {formatCurrency(report.totalEarnings)}
                </span>
                <span className="subtext">From all earnings entries</span>
              </div>
              <div className="summary-card negative">
                <span className="label">Expenses</span>
                <span className="value">
                  {formatCurrency(report.totalExpenses)}
                </span>
                <span className="subtext">From all expense entries</span>
              </div>
              <div
                className={`summary-card ${report.net >= 0 ? "positive" : "negative"}`}
              >
                <span className="label">Net</span>
                <span className="value">{formatCurrency(report.net)}</span>
                <span className="subtext">Income minus expenses</span>
              </div>
            </div>

            <div className="breakdown-grid">
              <div className="report-section">
                <h2>Income by Type</h2>
                {Object.keys(report.earningsByType).length ? (
                  Object.entries(report.earningsByType).map(([key, value]) => (
                    <div key={key} className="list-item">
                      <strong>{key}</strong>
                      <span className="amount-positive">
                        {formatCurrency(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No income data yet.</div>
                )}
              </div>

              <div className="report-section">
                <h2>Expenses by Type</h2>
                {Object.keys(report.expensesByType).length ? (
                  Object.entries(report.expensesByType).map(([key, value]) => (
                    <div key={key} className="list-item">
                      <strong>{key}</strong>
                      <span className="amount-negative">
                        {formatCurrency(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No expense data yet.</div>
                )}
              </div>
            </div>

            <div className="report-section">
              <h2>Monthly Summary</h2>
              {Object.keys(report.monthlySummary).length ? (
                Object.entries(report.monthlySummary)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([month, values]) => (
                    <div key={month} className="list-item">
                      <strong>{month}</strong>
                      <span>
                        Income {formatCurrency(values.income)} • Expenses{" "}
                        {formatCurrency(values.expenses)}
                      </span>
                    </div>
                  ))
              ) : (
                <div className="empty-state">No monthly data yet.</div>
              )}
            </div>

            <div className="report-section">
              <h2>Recent Activity</h2>
              <div className="table-wrap">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...filteredEarnings, ...filteredExpenses]
                      .sort(
                        (a, b) =>
                          new Date(b.dateFrom || b.date || 0) -
                          new Date(a.dateFrom || a.date || 0),
                      )
                      .slice(0, 8)
                      .map((item, index) => {
                        const isExpense = Boolean(item.expensesType);
                        return (
                          <tr
                            key={`${isExpense ? "expense" : "earning"}-${index}`}
                          >
                            <td>
                              {formatDate(item.dateFrom || item.date || "")}
                            </td>
                            <td>
                              {isExpense
                                ? item.expensesType
                                : item.earningsType}
                            </td>
                            <td
                              className={
                                isExpense
                                  ? "amount-negative"
                                  : "amount-positive"
                              }
                            >
                              {formatCurrency(item.amount)}
                            </td>
                            <td>{item.comments || "-"}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
