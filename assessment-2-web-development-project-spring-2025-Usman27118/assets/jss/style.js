// Main JavaScript for PUBG Website

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality for gameplay modes
  function openMode(evt, modeName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the current tab and add active class to the button
    document.getElementById(modeName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Set default tab to be open
  document.querySelector(".tab-button").click();

  // Accordion functionality for tips section
  const accordions = document.getElementsByClassName("accordion");
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Weapons filter functionality
  function filterWeapons(category) {
    const weapons = document.getElementsByClassName("weapon-card");

    // Update active button
    const filterButtons = document.getElementsByClassName("filter-btn");
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove("active");
    }
    event.currentTarget.classList.add("active");

    // Filter weapons
    for (let i = 0; i < weapons.length; i++) {
      if (category === "all" || weapons[i].classList.contains(category)) {
        weapons[i].style.display = "block";
      } else {
        weapons[i].style.display = "none";
      }
    }
  }

  // Map modal functionality
  function openMapModal(mapName) {
    const modal = document.getElementById("mapModal");
    const modalContent = document.getElementById("modal-content");

    // Based on mapName, fetch and display appropriate content
    let content = "";
    switch (mapName) {
      case "erangel":
        content = `
                    <h2>Erangel</h2>
                    <img src="images/erangel-large.jpg" alt="Erangel Map">
                    <p>Erangel is the original 8x8 km map that started it all. It features a mix of rural areas, small towns, and military installations across diverse terrain including fields, forests, and coastal areas.</p>
                    <h3>Key Locations:</h3>
                    <ul>
                        <li>Military Base - High risk, high reward area with best loot</li>
                        <li>Pochinki - Central town with intense early-game fights</li>
                        <li>Georgopol - Large city with warehouses and containers</li>
                        <li>Mylta Power - Strategic location with good sightlines</li>
                    </ul>
                `;
        break;
      case "miramar":
        content = `
                    <h2>Miramar</h2>
                    <img src="images/miramar-large.jpg" alt="Miramar Map">
                    <p>Miramar is an 8x8 km desert map with a focus on long-range combat. It features wide open areas, rugged terrain, and urban areas with multi-story buildings perfect for snipers.</p>
                    <h3>Key Locations:</h3>
                    <ul>
                        <li>Pecado - Central arena with high-risk combat</li>
                        <li>Hacienda del Patrón - Luxury villa with good loot</li>
                        <li>Los Leones - Largest city with vertical gameplay</li>
                        <li>El Pozo - Industrial area with good loot density</li>
                    </ul>
                `;
        break;
      // Add cases for other maps
    }

    modalContent.innerHTML = content;
    modal.style.display = "block";
  }

  function closeMapModal() {
    document.getElementById("mapModal").style.display = "none";
  }

  // Close modal when clicking outside content
  window.onclick = function (event) {
    const modal = document.getElementById("mapModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Initialize interactive map (Leaflet.js)
  if (document.getElementById("mapid")) {
    const mymap = L.map("mapid").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    // Add some markers for key locations (these would be actual Erangel coordinates)
    const militaryBase = L.marker([51.51, -0.1])
      .addTo(mymap)
      .bindPopup("<b>Military Base</b><br>High-tier loot area");

    const pochinki = L.marker([51.505, -0.09])
      .addTo(mymap)
      .bindPopup("<b>Pochinki</b><br>Central hot drop");

    const georgopol = L.marker([51.5, -0.08])
      .addTo(mymap)
      .bindPopup("<b>Georgopol</b><br>Warehouses and containers");

    // Map control functions
    window.showLootLocations = function () {
      // In a real implementation, this would show loot spawn areas
      alert("Loot locations would be displayed on the map");
    };

    window.showVehicleSpawns = function () {
      // In a real implementation, this would show vehicle spawn points
      alert("Vehicle spawns would be displayed on the map");
    };

    window.showHotDrops = function () {
      // In a real implementation, this would show popular drop locations
      alert("Hot drop zones would be displayed on the map");
    };
  }

  // Stats filtering for esports page
  if (document.getElementById("stats-body")) {
    // Sample player data - in a real site this would come from an API
    const players = [
      {
        name: "Player1",
        team: "Team A",
        region: "na",
        kills: 342,
        damage: 56789,
        headshots: 42,
      },
      {
        name: "Player2",
        team: "Team B",
        region: "eu",
        kills: 298,
        damage: 51234,
        headshots: 38,
      },
      {
        name: "Player3",
        team: "Team C",
        region: "as",
        kills: 312,
        damage: 49876,
        headshots: 45,
      },
      // More players...
    ];

    function updateStatsTable(region, stat) {
      const tbody = document.getElementById("stats-body");
      tbody.innerHTML = "";

      // Filter and sort players
      let filteredPlayers = [...players];

      if (region !== "all") {
        filteredPlayers = filteredPlayers.filter((p) => p.region === region);
      }

      filteredPlayers.sort((a, b) => b[stat] - a[stat]);

      // Add players to table
      filteredPlayers.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.team}</td>
                    <td>${player.kills}</td>
                    <td>${player.damage}</td>
                    <td>${player.headshots}%</td>
                `;
        tbody.appendChild(row);
      });
    }

    // Initial load
    updateStatsTable("all", "kills");

    // Add event listeners to filters
    document
      .getElementById("region-filter")
      .addEventListener("change", function () {
        const region = this.value;
        const stat = document.getElementById("stat-filter").value;
        updateStatsTable(region, stat);
      });

    document
      .getElementById("stat-filter")
      .addEventListener("change", function () {
        const stat = this.value;
        const region = document.getElementById("region-filter").value;
        updateStatsTable(region, stat);
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Video controls for hero video
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    // Ensure video plays on mobile (with user interaction)
    document.addEventListener(
      "click",
      function () {
        heroVideo.play().catch((e) => console.log("Video play prevented:", e));
      },
      { once: true }
    );
  }
});
