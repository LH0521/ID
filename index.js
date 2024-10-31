function updatePreview() {
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const age = document.getElementById('age').value;
    const race = document.getElementById('race').value;
    const sex = document.getElementById('sex').value;
    const startColor = document.getElementById('theme-color-start')?.value || '#FF5F6D';
    const endColor = document.getElementById('theme-color-end')?.value || '#FFC371';

    document.getElementById('banner-name').textContent = name || 'Name';
    document.getElementById('display-location').textContent = location || '--';
    document.getElementById('display-age').textContent = age || '--';
    document.getElementById('display-race').textContent = race || '--';
    document.getElementById('display-sex').textContent = sex || '--';

    document.getElementById('banner').style.background = `linear-gradient(90deg, ${startColor}, ${endColor})`;

    toggleField('location-row', 'show-location', 'location');
    toggleField('age-row', 'show-age', 'age');
    toggleField('race-row', 'show-race', 'race');
    toggleField('sex-row', 'show-sex', 'sex');

    validateForm();
}

function toggleField(rowId, checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const row = document.getElementById(rowId);
    const input = document.getElementById(inputId);

    if (checkbox.checked) {
        row.classList.remove('d-none');
        input.disabled = false;
    } else {
        row.classList.add('d-none');
        input.disabled = true;
        input.value = '';
    }
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('photo').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    validateForm();
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const locationChecked = document.getElementById('show-location').checked;
    const locationFilled = document.getElementById('location').value.trim();
    const photo = document.getElementById('upload-photo').files.length > 0;
    const ageChecked = document.getElementById('show-age').checked;
    const ageFilled = document.getElementById('age').value.trim();
    const raceChecked = document.getElementById('show-race').checked;
    const raceFilled = document.getElementById('race').value.trim();
    const sexChecked = document.getElementById('show-sex').checked;
    const sexFilled = document.getElementById('sex').value.trim();

    const allFieldsValid =
        name &&
        photo &&
        (!locationChecked || locationFilled) &&
        (!ageChecked || ageFilled) &&
        (!raceChecked || raceFilled) &&
        (!sexChecked || sexFilled);

    document.getElementById('download-btn').disabled = !allFieldsValid;
}

function downloadImage() {
    const idCard = document.getElementById('id-card');
    html2canvas(idCard, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'id-card.png';
        link.click();
    });
}

document.getElementById('name').addEventListener('input', updatePreview);
document.getElementById('location').addEventListener('input', updatePreview);
document.getElementById('age').addEventListener('input', updatePreview);
document.getElementById('race').addEventListener('input', updatePreview);
document.getElementById('sex').addEventListener('input', updatePreview);
document.getElementById('upload-photo').addEventListener('change', previewPhoto);
document.getElementById('show-location').addEventListener('change', updatePreview);
document.getElementById('show-age').addEventListener('change', updatePreview);
document.getElementById('show-race').addEventListener('change', updatePreview);
document.getElementById('show-sex').addEventListener('change', updatePreview);
document.getElementById('theme-color-start').addEventListener('input', updatePreview);
document.getElementById('theme-color-end').addEventListener('input', updatePreview);
