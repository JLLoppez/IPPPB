function CriarInputIdiomaNoFormulario() {
    $("<input>").attr({
        type: "hidden",
        id: "LANGUAGE_BROWSER",
        name: "LANGUAGE_BROWSER",
        value: ObterIdiomaNavegador()
    }).appendTo("form")
}

function ObterIdiomaNavegador() {
    var a = navigator.languages[0].toString().split("-");
    return a[0]
}
$(window).on("load", function () {
    CriarInputIdiomaNoFormulario();
    var a = function (a) {
            return 11 === a.replace(/\D/g, "").length ? "(00) 00000-0000" : "(00) 0000-00009"
        },
        b = {
            clearIfNotMatch: !0,
            onKeyPress: function (b, c, d, e) {
                d.mask(a.apply({}, arguments), e)
            }
        };
    $(".phone").mask(a, b)
}), $(document).ready(function () {
    $("#ModalCadastreSe") && setTimeout(function () {
        $("#ModalCadastreSe").modal("show")
    }, 1e4)
});