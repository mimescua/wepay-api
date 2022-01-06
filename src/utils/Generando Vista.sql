SELECT * FROM pagos
INNER JOIN archivoscomprobantesahorrador AS depositos ON pagos._id = depositos.pagoId
INNER JOIN boletas ON pagos._id = boletas.pagoId
LEFT JOIN users ON pagos.userId = users._id
LEFT JOIN promocionesahorradores AS promociones ON pagos.promoId = promociones._id
WHERE pagos.editable = false
--1861,1170,1240,,1240,1240,1129

SELECT COUNT(*) FROM pagos
INNER JOIN boletas ON pagos._id = boletas.pagoId
WHERE pagos.editable = false
--1861,1977,1108

SELECT COUNT(*) FROM archivoscomprobantesahorrador
--pagos 1861
--boletas 1977
--archivoscomprobantesahorrador 1170

--pagoId duplicado en boletas, 76 pagoId duplicados, 216 boletas comprometidas
SELECT pagoId, COUNT(*)
FROM boletas
GROUP BY pagoId
HAVING COUNT(*) > 1

--pagoId duplicado en boletas join archivoscomprobantesahorrador, 75 pagoId duplicados, 211 boletas comprometidas
SELECT boletas.pagoId, COUNT(*)
FROM boletas
INNER JOIN archivoscomprobantesahorrador ON archivoscomprobantesahorrador.pagoId = boletas.pagoId
GROUP BY boletas.pagoId
HAVING COUNT(*) > 1

--ejemplo pagoId duplicado en boletas
SELECT * FROM boletas WHERE pagoId='dTFXQ7YrcDLcephkF'
SELECT * FROM boletas WHERE pagoId='RwsFZphQJyvzZDFdQ'


--todos pagoId duplicado en boletas
SELECT * FROM boletas
WHERE pagoId IN ("3svveAG6Wom6tp3HQ", "4pqxpAnRyRGosTdKP", "4u5RYe3K5r9AJ9qSR", "5e2j7WTbA7LiufF3y", "6LDcvq84iaxssGRsp", "6jqdQ4rySZRsWE54u", "B8En33BcsYjij2m5G", "BAqbvsBkNCDCSedRK", "CDwuoAr2w2fydKzky", "CHjrZrag2o4Qo4HAi", "FDuMtcWWwX2w3NX6M", "GnGhbgqJc8aRFNQ7j", "H8gwM7bFxyMvCdPTP", "JQGYihPpTvvDmcGHA", "JqpxtH6uaWKWbfcEe", "KhGpnN3hk8KEPqFR3", "LdP6xYkZ8GoMye9QS", "MHw9B8Gzjwt7fwt9D", "MuFfFmtWXd8FaEucg", "NfJro5dBmfvZXCYML", "NosiSq9xJy7ndmLJi", "RwsFZphQJyvzZDFdQ", "T2oKdx8ERc5pPjH8z", "T6auecfDRaSbmYiiA", "Xn9i3k932fyF42LLn", "a8KB7AuD9vKWeAvXB", "bbQLAgbvySTvFqhSm", "dTFXQ7YrcDLcephkF", "dftaM6ixt5jh9ZbDE", "eByTu9sTtJSGAeiNW", "eNgKvgpbRvGBdBBYS", "fh8AZJatC5QjWGsSH", "kGdqBq9AN7Bo9P7TL", "m8yEKZkpJqro3rrWR", "ne8WCeikJ3sctXmsm", "nwvcAqznHs69cK7ro", "oBcz86rY3TsLvYgSQ", "rCHruSKELpdxzaA3m", "rPhJ44xKvZmHMXgzb", "rcKnY7eP4W9Zgdb8F", "sJcEzePS3PjkrpQvD", "sZK5k6HBdAkQWtaLJ", "sqiuoStu2suQi45vP", "tTJz8c4TJSjpGB8jH", "tXTpnRKMQr9hpLkdW", "udWTApDcEC5FCFX7b", "uyeQjTLNdGdLw7h5e", "zcZfDCZd5mfghnNs4", "zpmqeb4QDKoNi7iDo", "zqWSoQrHSLJhex2iT")
ORDER BY pagoId