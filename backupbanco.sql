— Backup Comum

BACKUP DATABASE [database]
TO DISK = N’Drive:\Pasta\Nome_do_arquivo.bkp’
WITH NOINIT , NOUNLOAD ,
NAME = N’meu backup’,
NOSKIP ,
STATS = 10,
NOFORMAT

— Backup Apontando para outro servidor (um storage por exemplo)

BACKUP DATABASE [database]
TO DISK = N’ip\Pasta\Nome_do_arquivo.bkp’
WITH NOINIT , NOUNLOAD ,
NAME = N’meu backup’,
NOSKIP ,
STATS = 10,
NOFORMAT

— Backup comprimido, usando WITH COMPRESSION

BACKUP DATABASE [database]
TO DISK = N’drive:\diretorio\nome_do_arquivo.bkp’
WITH NOINIT, NOUNLOAD,
Name = N’meu backup’
COMPRESSION, NOSKIP,
STATS = 10, NOFORMAT

— assim como o parâmetro compression, vc pode acrescentar DIFFERENTIAL (para backups diferenciais)
— Backup Log com shirink

BACKUP LOG database
WITH TRUNCATE_ONLYDBCC SHRINKDATABASE (‘database’)