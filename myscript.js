// Deklarasi variabel //

var createStatement = "CREATE TABLE IF NOT EXISTS Siswa (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, raport INTEGER, absensi INTEGER, sikap INTEGER, ekstra INTEGER, hasil INTEGER)";

var selectStatement = "SELECT * FROM Siswa ORDER BY hasil ASC LIMIT 10";

var insertStatement = "INSERT INTO Siswa (nama, raport, absensi, sikap, ekstra, hasil) VALUES (?, ?, ?, ?, ?, ?)";

var db = openDatabase("app_pesiber", "1.0", "Address Book", 200000);

var dataset;
 
var DataType;

function initDatabase()
{
    try {
        if (!window.openDatabase)
        {
            alert('Databases are not supported in this browser.');
        }
        else {
            createTable();
        }
    }
    catch (e) {
        if (e == 2) {
            alert("Invalid database version.");
        } else {
            alert("Unknown error " + e + ".");
        }
        return;
    }
}
function createTable()
{
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
}
 
function insertRecord()
{
	var nama = $('#nama').val();
	var raport = $('#raport').val();
	var absensi = $('#absensi').val();
	var sikap = $('#sikap').val();
	var ekstra = $('#ekstra').val();
	var hasil = ((parseInt(raport)+(parseInt(absensi)/3)+(parseInt(sikap)/5)+(parseInt(ekstra)/7))/4).toFixed(2);
	if(nama=="" || raport=="" || absensi=="" || sikap=="" || ekstra=="")
	{
		alert("Data tidak boleh kosong!");
	} else
	{
        db.transaction(function (tx) { tx.executeSql(insertStatement, [nama, raport, absensi, sikap, ekstra, hasil], loadAndReset, onError); });
		alert("Data disimpan!");
		window.location.href = "rangking.html";
	}
}
 
function loadRecord(i)
{
    var item = dataset.item(i);
	$("#nama").val((item['nama']).toString());
    $("#raport").val((item['raport']).toString());
	$("#absensi").val((item['absensi']).toString());
	$("#sikap").val((item['sikap']).toString());
	$("#ekstra").val((item['ekstra']).toString());
	$("#hasil").val((item['hasil']).toString());
}
 
function resetForm()
{
    var nama = $('#nama').val('');
	var raport = $('#raport').val('');
	var absensi = $('#absensi').val('');
	var sikap = $('#sikap').val('');
	var ekstra = $('#ekstra').val('');
}
 
function loadAndReset()
{
    resetForm();
    showRecords();
}
 
function onError(tx, error)
{
    alert(error.message);
}
 
function showRecords()
{
    db.transaction(function (tx) {
 
        tx.executeSql(selectStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var tabel = document.getElementById('tabel').insertRow(0);
				var baris1 = tabel.insertCell(0).innerHTML = item['nama'];
				var baris2 = tabel.insertCell(1).innerHTML = item['raport'];
				var baris3 = tabel.insertCell(2).innerHTML = item['absensi'];
				var baris4 = tabel.insertCell(3).innerHTML = item['sikap'];
				var baris5 = tabel.insertCell(4).innerHTML = item['ekstra'];
				var baris6 = tabel.insertCell(5).innerHTML = item['hasil'];
            }
        });
 
    });
 
}
 
$(document).ready(function ()
{
    $("body").fadeIn(2000);
    initDatabase();
    $("#simpan").click(insertRecord);
});