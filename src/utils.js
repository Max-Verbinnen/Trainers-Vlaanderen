export const printPage = () => {
  // Get HTML to print from element
  const prtHtml = document.getElementById("print").innerHTML;

  // Get all stylesheets HTML
  let stylesHtml = "";
  for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML;
  }

  // Open the print window
  const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

  WinPrint.document.write(`<!DOCTYPE html>
  <html>
    <head>
      ${stylesHtml}
      <style>
        .uitleg {
          flex-direction: column;
          margin: 0;
        }
        .uitleg img {
          align-self: flex-start;
          margin: 3rem 0;
        }
      </style>
    </head>
    <body>
      ${prtHtml}
    </body>
  </html>`);

  WinPrint.document.close();
  window.setTimeout(() => {WinPrint.focus(); WinPrint.print()}, 1000);
}

export const authErrors = () => {
  return {
    "admin-restricted-operation": "Enkel admins kunnen deze actie uitvoeren.",
    "credential-already-in-use": "Deze inloggegevens zijn al gelinkt aan een account.",
    "email-change-needs-verification": "Je e-mailadres moet nog geverifieerd worden.",
    "email-already-in-use": "Dit e-mailadres wordt al door een andere trainer gebruikt.",
    "invalid-email": "Het opgegeven e-mailadres is ongeldig.",
    "invalid-credential": "De inloggegevens gelden niet meer.",
    "wrong-password": "Het ingegeven wachtwoord is fout.",
    "invalid-recipient-email": "De mail is niet verzonden omdat het opgegeven e-maildres ongeldig is.",
    "no-such-provider": "De gebruiker kan niet via de provider gelinkt worden aan een account.",
    "null-user": "De informatie van de gebruiker is leeg.",
    "rejected-credential": "De inloggegevens kloppen niet.",
    timeout: "De standaardtijd voor deze operatie is overschreden.",
    "user-token-expired": "Log opnieuw in.",
    "too-many-requests": "We hebben alle verzoeken van deze gebruiker geblokkeerd wegens ongewoonlijke activiteit. Probeer het later opnieuw.",
    "unverified-email": "Je e-mail is niet geverifieerd.",
    "user-cancelled": "Je hebt de nodige toegang niet gegeven.",
    "user-not-found": "Dit account bestaat niet.",
    "user-disabled": "Je account is geblokkeerd door een administrator.",
    "user-mismatch": "De logingegevens komen niet overeen met de vroeger ingelogde gebruiker.",
    "weak-password": "Het wachtwoord moet minstens 6 karakters bevatten.",
    "web-storage-unsupported": "Wij supporten deze browser of besturingssysteem jammer genoeg niet.",
  }
}

export const currentDate = () => {
  const now = new Date();
  return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
}