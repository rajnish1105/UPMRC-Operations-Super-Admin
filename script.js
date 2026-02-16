const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function (e) {
		// Allow default navigation for links with href not '#'
		// Make all links responsive regardless of href value
		e.preventDefault();
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');

		// Navigate to the href if it is not '#'
		const href = item.getAttribute('href');
		if (href && href !== '#') {
			window.location.href = href;
		}
	})
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})



if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


document.addEventListener('DOMContentLoaded', function() {
  // Utility function to get count from overview cards by title
  function getOverviewCount(title) {
    const cards = document.querySelectorAll('.overview-card');
    for (const card of cards) {
      const h3 = card.querySelector('h3');
      if (h3 && h3.textContent.trim().toLowerCase() === title.toLowerCase()) {
        const p = card.querySelector('p');
        if (p) {
          const val = parseInt(p.textContent.trim(), 10);
          if (!isNaN(val)) return val;
        }
      }
    }
    return 0;
  }

  // Get counts from overview cards
  const pendingCount = getOverviewCount('Pending');
  const programCount = getOverviewCount('Program');
  const closedCount = getOverviewCount('Closed');
  const resolveCount = getOverviewCount('Resolve');

  // Get Not Assigned count from the table
  let notAssignedCount = 0;
  const notAssignedCells = document.querySelectorAll('.not-assigned-table tbody tr td:last-child');
  notAssignedCells.forEach(cell => {
    if (cell.textContent.trim().toLowerCase() === 'not assigned') {
      notAssignedCount++;
    }
  });

  // Prepare data and labels for the chart
  const labels = [
    'Pending',
    'Program',
    'Closed',
    'Resolve',
    'Not Assigned'
  ];
  const data = [
    pendingCount,
    programCount,
    closedCount,
    resolveCount,
    notAssignedCount
  ];
  const colors = [
    '#FFCE26', // Pending - yellow
    '#3C91E6', // Program - blue
    '#FD7238', // Closed - orange
    '#34c759', // Resolve - green
    '#DB504A'  // Not Assigned - red
  ];

  // Render the pie chart
  const ctx = document.getElementById('workStatusPie').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: { size: 14 },
            generateLabels: function(chart) {
              const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const items = original(chart);
              // Add FontAwesome icons to legend labels
              items.forEach((item, i) => {
                item.text = `\uf111  ${labels[i]} (${data[i]})`; // Use fa-circle as icon
                item.font = { family: 'FontAwesome, Arial', size: 14 };
              });
              return items;
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${labels[context.dataIndex]}: ${data[context.dataIndex]}`;
            }
          }
        }
      }
    }
  });
});
// Account Info page toggle
const accountInfoBtn = document.getElementById('account-info-btn');
const accountInfoSection = document.getElementById('account-info-section');
const mainDashboard = document.querySelector('main'); // adjust if your main dashboard is inside <main>
const backToDashboardBtn = document.getElementById('back-to-dashboard');

const ticketRaisingBtn = document.querySelector('#sidebar .side-menu.top li a[href="#"]:nth-child(4)');
const ticketRaisingSection = document.getElementById('ticket-raising-section');
const ticketRaisingBackBtn = document.querySelector('#ticket-raising-section form button.back-btn');

accountInfoBtn.addEventListener('click', function(e) {
  e.preventDefault();
  mainDashboard.style.display = 'none';
  accountInfoSection.style.display = 'block';
});

backToDashboardBtn.addEventListener('click', function() {
  accountInfoSection.style.display = 'none';
  mainDashboard.style.display = 'block';
});

if (ticketRaisingBtn) {
  ticketRaisingBtn.addEventListener('click', function(e) {
    e.preventDefault();
    mainDashboard.style.display = 'none';
    ticketRaisingSection.style.display = 'block';

    // Remove active class from all sidebar items and add to this
    document.querySelectorAll('#sidebar .side-menu.top li').forEach(li => li.classList.remove('active'));
    this.parentElement.classList.add('active');
  });
}

if (ticketRaisingBackBtn) {
  ticketRaisingBackBtn.addEventListener('click', function(e) {
    e.preventDefault();
    ticketRaisingSection.style.display = 'none';
    mainDashboard.style.display = 'block';

    // Remove active class from all sidebar items and add to dashboard
    document.querySelectorAll('#sidebar .side-menu.top li').forEach(li => li.classList.remove('active'));
    document.querySelector('#sidebar .side-menu.top li.active')?.classList.remove('active');
    document.querySelector('#sidebar .side-menu.top li:first-child').classList.add('active');
  });
}

document.querySelectorAll('.overview-card').forEach(card => {
  card.addEventListener('click', function() {
    // Hide dashboard, show relevant section
    document.querySelector('main').style.display = 'none';
    document.getElementById(`${this.dataset.status}-section`).style.display = 'block';
  });
});

// Add event listeners to back buttons in ticket sections to show dashboard
document.querySelectorAll('.back-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.ticket-section').forEach(section => {
      section.style.display = 'none';
    });
    document.querySelector('main').style.display = 'block';
  });
});

function showSection(sectionId) {
  // Hide all ticket sections
  document.querySelectorAll('.ticket-section').forEach(sec => sec.style.display = 'none');
  // Hide main dashboard
  document.querySelector('main').style.display = 'none';
  // Show selected section
  document.getElementById(sectionId).style.display = 'block';
}

function showDashboard() {
  document.querySelectorAll('.ticket-section').forEach(sec => sec.style.display = 'none');
  document.querySelector('main').style.display = 'block';
}

// Example: Connect overview cards to sections
document.getElementById('pending-card').addEventListener('click', () => showSection('pending-section'));
document.getElementById('program-card').addEventListener('click', () => showSection('program-section'));
document.getElementById('closed-card').addEventListener('click', () => showSection('closed-section'));
document.getElementById('resolve-card').addEventListener('click', () => showSection('resolve-section'));

// Utility function to count rows in a table body
function countTickets(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return 0;
  return table.querySelectorAll('tbody tr').length;
}

// Update overview cards with counts
function updateOverviewCounts() {
  const pendingCount = countTickets('pending-table');
  const programCount = countTickets('program-table');
  const closedCount = countTickets('closed-table');
  const resolveCount = countTickets('resolve-table');

  document.querySelector('#pending-card .count').textContent = pendingCount;
  document.querySelector('#program-card .count').textContent = programCount;
  document.querySelector('#closed-card .count').textContent = closedCount;
  document.querySelector('#resolve-card .count').textContent = resolveCount;

  return { pendingCount, programCount, closedCount, resolveCount };
}

let workStatusChart;

function renderPieChart(data) {
  const ctx = document.getElementById('workStatusPie').getContext('2d');

  if (workStatusChart) {
    workStatusChart.destroy(); // Destroy previous chart to update
  }

  workStatusChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Pending', 'Program', 'Closed', 'Resolve'],
      datasets: [{
        data: [data.pendingCount, data.programCount, data.closedCount, data.resolveCount],
        backgroundColor: [
          '#FFCE26', // Pending - yellow
          '#3C91E6', // Program - blue
          '#FD7238', // Closed - orange
          '#34c759'  // Resolve - green
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: { size: 14 },
            generateLabels: function(chart) {
              const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const items = original(chart);
              items.forEach((item, i) => {
                item.text = `${chart.data.labels[i]} (${chart.data.datasets[0].data[i]})`;
              });
              return items;
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}`;
            }
          }
        }
      }
    }
  });
}

// Initialize counts and chart on page load
document.addEventListener('DOMContentLoaded', () => {
  const counts = updateOverviewCounts();
  renderPieChart(counts);
});

const counts = updateOverviewCounts();
renderPieChart(counts);
