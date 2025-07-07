// Pobieranie danych z API Discord
async function fetchDiscordData() {
    try {
        const response = await fetch('https://discord.com/api/guilds/1247489384794558485/widget.json');
        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych z API Discord');
        }
        const data = await response.json();

        // Aktualizuj wartości w HTML
        document.getElementById('discord-members').textContent = data.member_count || 'N/A';
        document.getElementById('discord-online').textContent = data.presence_count || 'N/A';
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API Discord:', error);
        document.getElementById('discord-members').textContent = 'Błąd';
        document.getElementById('discord-online').textContent = 'Błąd';
    }
}

// Wywołaj funkcję po załadowaniu strony
fetchDiscordData();