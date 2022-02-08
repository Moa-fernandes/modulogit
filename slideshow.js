/*	
			leia --- COMENT�RIOS SOBRE ALGUMAS FUN��ES DESTA P�GINA !!!
	handleErr(msg,url,l)	- ser� chamado quando ouver erros na p�gina
	atualizaFoto()		- ser� chamada quando o visitante marcar/desmarcar a op��o de trocar foto ap�s 10segundos
	onLoadImg()		- ser� chamada quando a imagem for carregada
	onChangeSelect(num) - ser� chamada quando for escolhida alguma op��o do select
	mostraFoto(num)	- esta � a fun��o principal, quem vai exibir/trocar as fotos (obs. 'num' aqui � o 'foto.numAtual')
	numReal(num)		- ser� chamada para retornar o n�mero real da foto
	completaNome(num)	- ser� chamada para completar o n�mero de caracter "0" que falta pro nome da foto ('num' aqui � o N�MERO REAL da foto)
	viewPage(e,grupo)	- ser� chamada para trocar a galeria de fotos a ser exibida
	
		--- o coment�rio atual pode ser deletado para limpar o c�digo ---
		--- por�m, cuidado para n�o esquecer do que se tratam as fun��es sitadas!!! ---
		--- caso ache melhor, deixe os coment�rios a�, que n�o ter� problema se vc esquecer ;) ---
*/	


	onerror = handleErr; //se der algum erro no javascript da p�gina, a fun�ao handleErr ser� executada
	var mudaFt=0; //0 para verdadeiro, 1 para falso
	var mudaFtInterv=""; //nesta vari�vel ser� iniciado o intervalo

	function handleErr(msg,url,l)
	{
		txt="Foi encontrado um erro nesta pagina.\n\n"
		txt+="Erro: " + msg + "\n"
		txt+="Pagina: " + url + "\n"
		txt+="Linha: " + l + "\n\n"
		txt+="Pedimos que anote os dados acima e informe-nos pelo contato do site."
		alert(txt)
		return true
	}

	function verProxima()
	{
		onChangeSelect(foto.numAtual +1)
	}
	
	function verAnterior()
	{
		onChangeSelect(foto.numAtual -1)
	}
	
	function atualizaFoto()
	{
		var inputChecked = document.getElementById("mudar").checked;
		if (!inputChecked) //desmarcou o input: parar
		{
		clearTimeout(mudaFtInterv);
		mudaFt = 1;
		document.getElementById("mudarNao").style.display="";
		}
		else //marcou o input: mudar foto automaticamente apos tempo
		{
			if (foto.numAtual < foto.numMax)
				{mudaFt = 0;
				setTimeout("mostraFoto(foto.numAtual+1)",10000)}
			else //quando estiver na ultima foto e marcarem pra mudar automatico, nao tera mais fotos, entao
				{mudaFt = 1;
				document.getElementById("mudarNao").style.display="none";
				alert("Nao ha mais fotos")};
		}
	}
	
	
	function onLoadImg()
	{		
		document.getElementById("carregando").style.display="none";
		document.getElementById("creditos").style.display = "";
		document.getElementById("foto").style.display = "";
		document.getElementById('num').innerHTML = foto.numAtual;
		if (mudaFt == 0 && foto.numAtual > 0 && foto.numAtual < foto.numMax)
			{mudaFtInterv = setTimeout("mostraFoto(foto.numAtual+1)",10000)};
	}
	
	function onChangeSelect(num)
	{
		document.getElementById('num').innerHTML = foto.numAtual;
		document.getElementById("carregando").style.display="";
		document.getElementById("creditos").style.display = "none";
		document.getElementById("foto").style.display = "none";
		mostraFoto(num);
	}
	
	
	function mostraFoto(num)
	{
		if (mudaFtInterv!=""){clearTimeout(mudaFtInterv)};
		if (num <= 0 || num > foto.numMax) {foto.numAtual = 1}
			else{foto.numAtual = num};
		var ft = document.getElementById("foto");
		ft.title = document.title + " - Imagem "+num+" / "+foto.numMax;
		ft.alt = "Imagem "+num+" / "+foto.numMax;
		ft.src = foto.endereco + completaNome(numReal(num) + foto.asomar) + foto.extensao;
		
		
		//---------------------------------------- INICIO: habiliar/desabilitar bot�es pr&oacute;ximo/anterior -------------------------------------------
		var prox = document.getElementById('proxima').disabled;
		var ant = document.getElementById('anterior').disabled;
		if (prox == true && num < foto.numMax)			{document.getElementById('proxima').disabled=false}
			else{if (prox == false && num == foto.numMax){document.getElementById('proxima').disabled=true}};
		if (ant == true && num > 1)					{document.getElementById('anterior').disabled=false}
			else{if (ant == false && num == 1)		{document.getElementById('anterior').disabled=true}};
		//---------------------------------------- FIM: habiliar/desabilitar bot�es pr&oacute;ximo/anterior -------------------------------------------
	}
	
	
	function numReal(num)
	{
		if (foto.numReais.length > 0) //se array existe
			{return (foto.numReais[num-1])} //elementro (num-1) pq o num comeCa em 1 e array em 0
		else
			{return (num)};
	}
	
	
	function completaNome(num) //ser� chamada para completar o n�mero de caracter "0" que falta pro nome da foto ('num' aqui � o N�MERO REAL da foto)
	{
		var maior = 0;
		if (foto.numReais.length > 0) //se array existe
		{
			maior = foto.numReais[0];
			for (i=0;i<foto.numReais.length;i++){if (foto.numReais[i] > maior){maior=foto.numReais[i]}}; //acha o maior numero real na array
		}
		else //nao existe array, logo, os n�meros reais � o foto.numAtual, e o foto.numMax � o n�mero maior deles
		{
			maior = foto.numMax;
		};
		var completa = "";
		for (i=(num+"").length;i<(maior+"").length;i++){completa += "0"}; //completa com 0 o foto.numAtual pra ficar com o mesmo length do maior
		return (completa+num+"");
	}


	function mostraAutor()
	{
		var texto = document.getElementById("creditos").innerHTML;
		if (foto.autorNome == ""){document.getElementById("creditos").parentNode.removeChild(document.getElementById("creditos"))}
		else
		{
			if (foto.autorNome != "")
			{
				if (foto.autorEmail != "")
					{texto = "<a href='mailto:"+foto.autorEmail+"'>"+foto.autorNome+"</a>"}
				else
					{texto = foto.autorNome};
			}
			document.getElementById("autor").innerHTML=texto;
		}
	}

	
	function viewPage(e,grupo)
	{
		document.getElementById('mudar').checked = true;

		if (e == "")
			{document.getElementById("tit").innerHTML = titInicial}
		else
			{document.getElementById("tit").innerHTML = e;
			document.title = e +' - '+ titInicial}

		getDadosFoto(grupo);
		document.getElementById('num').innerHTML = foto.numAtual;
		document.getElementById('numMax').innerHTML = foto.numMax;
		
		var selec = document.getElementById("selectNum").options;
		selec.length=1;

		for (i=1;i<=foto.numMax;i++)
		{
			selecOpcao = document.createElement('option');
			selecOpcao.value = ''+i;
			selecOpcao.text = ''+i;
	
			try
				{selec.add(selecOpcao,selec.length)} //adiciona no final da lista de options
			catch(e)
				{selec.add(selecOpcao)};
			
		}
		
		onChangeSelect(1);
		mostraAutor();
	}

